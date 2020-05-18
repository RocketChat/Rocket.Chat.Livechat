import { route } from 'preact-router';

import { Livechat } from '../api';
import store from '../store';
import { upsert, createToken, asyncForEach } from '../components/helpers';
import { parentCall } from './parentCall';
import { processUnread } from './main';
import { normalizeAgent } from './api';

const agentCacheExpiry = 3600000;
let agentPromise;
const getAgent = (triggerAction) => {
	if (agentPromise) {
		return agentPromise;
	}

	agentPromise = new Promise(async (resolve, reject) => {
		const { params } = triggerAction;

		if (params.sender === 'queue') {
			const { state } = store;
			const { defaultAgent, iframe: { guest: { department } } } = state;
			if (defaultAgent && defaultAgent.ts && Date.now() - defaultAgent.ts < agentCacheExpiry) {
				return resolve(defaultAgent); // cache valid for 1
			}

			let agent;
			try {
				agent = await Livechat.nextAgent(department);
			} catch (error) {
				return reject(error);
			}

			store.setState({ defaultAgent: { ...agent, ts: Date.now() } });
			resolve(agent);
		} else if (params.sender === 'custom') {
			resolve({
				username: params.name,
			});
		} else {
			reject('Unknown sender');
		}
	});

	// expire the promise cache as well
	setTimeout(() => {
		agentPromise = null;
	}, agentCacheExpiry);

	return agentPromise;
};

class Triggers {
	constructor() {
		if (!Triggers.instance) {
			this._started = false;
			this._requests = [];
			this._triggers = [];
			this._enabled = true;
			Triggers.instance = this;
		}

		return Triggers.instance;
	}

	init() {
		if (this._started) {
			return;
		}

		const { token, firedTriggers = [], config: { triggers } } = store.state;
		Livechat.credentials.token = token;

		if (!(triggers && triggers.length > 0)) {
			return;
		}

		this._started = true;
		this._triggers = [...triggers];

		firedTriggers.forEach((triggerId) => {
			this._triggers.forEach((trigger) => {
				if (trigger._id === triggerId) {
					trigger.skip = true;
				}
			});
		});

		this.processTriggers();
	}

	async fire(trigger) {
		const { token, user, firedTriggers = [] } = store.state;
		if (!this._enabled || user) {
			return;
		}
		const { actions } = trigger;

		await asyncForEach(actions, (action) => {
			if (action.name === 'send-message') {
				trigger.skip = true;

				getAgent(action).then(async (agent) => {
					const ts = new Date();

					const message = {
						msg: action.params.msg,
						token,
						u: agent,
						ts: ts.toISOString(),
						_id: createToken(),
						trigger: true,
					};

					await store.setState({
						triggered: true,
						messages: upsert(store.state.messages, message, ({ _id }) => _id === message._id, ({ ts }) => ts),
					});
					await processUnread();

					if (agent && agent._id) {
						await store.setState({ agent });
						parentCall('callback', ['assign-agent', normalizeAgent(agent)]);
					}

					route('/');
					parentCall('openWidget');
					store.setState({ minimized: false });
				});
			}
		});

		if (trigger.runOnce) {
			trigger.skip = true;
			firedTriggers.push(trigger._id);
			store.setState({ firedTriggers });
		}
	}

	processRequest(request) {
		this._requests.push(request);
		if (!this._started) {
			return;
		}

		this.processTriggers();
	}

	processTriggers() {
		this._triggers.forEach((trigger) => {
			if (trigger.skip) {
				return;
			}

			const self = this;
			trigger.conditions.forEach((condition) => {
				switch (condition.name) {
					case 'page-url':
						this._requests.forEach((request) => {
							const hrefRegExp = new RegExp(condition.value, 'g');
							if (request.location.href.match(hrefRegExp)) {
								self.fire(trigger);
							}
						});
						this._requests = [];
						break;
					case 'time-on-site':
						if (trigger.timeout) {
							clearTimeout(trigger.timeout);
						}
						trigger.timeout = setTimeout(() => {
							this.fire(trigger);
						}, parseInt(condition.value, 10) * 1000);
						break;
				}
			});
		});
	}

	set triggers(newTriggers) {
		this._triggers = [...newTriggers];
	}

	set enabled(value) {
		this._enabled = value;
	}
}

const instance = new Triggers();
export default instance;
