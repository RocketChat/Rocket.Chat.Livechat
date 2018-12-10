import SDK from '../api';
import { store } from '../store';
import { insert, createToken } from 'components/helpers';

const agentCacheExpiry = 3600000;
let agentPromise;
const getAgent = (triggerAction) => {
	if (agentPromise) {
		return agentPromise;
	}

	agentPromise = new Promise(async(resolve, reject) => {
		const { params } = triggerAction;

		if (params.sender === 'queue') {
			const { state } = store;
			const { token, triggerAgent } = state;

			if (triggerAgent) {
				const cacheAgent = triggerAgent;

				// cache valid for 1h
				if (cacheAgent.ts && Date.now() - cacheAgent.ts < agentCacheExpiry) {
					return resolve(cacheAgent.agent);
				}
			}

			let agent;
			try {
				({ agent } = await SDK.nextAgent({ token }));
			} catch (error) {
				return reject(error);
			}

			store.setState({ 'triggerAgent': { agent, ts: Date.now() } });
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
}

class TriggersManager {
	constructor() {
		if (!TriggersManager.instance) {
			this._started = false;
			this._requests = [];
			this._triggers = [];
			this._enabled = true;
			TriggersManager.instance = this;
		}

		return TriggersManager.instance;
	}

	init() {
		if (this._started) {
			return;
		}

		const { state } = store;
		const { token, firedTriggers = [], config: { triggers } } = state;
		SDK.credentials.token = token;

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

	fire(trigger) {
		const { state } = store;
		const { token, user, firedTriggers = [] } = state;
		if (!this._enabled || user) { // need to think about testing user obj here..
			return;
		}

		trigger.actions.forEach((action) => {
			if (action.name === 'send-message') {
				trigger.skip = true;

				getAgent(action).then(async(agent) => {
					const message = {
						msg: action.params.msg,
						token,
						u: agent,
						ts: new Date(),
						_id: createToken(),
					}

					store.setState({ triggered: true, messages: insert(store.state.messages, message).filter(({ msg }) => ({ msg })) });

					// TODO: Need to think about the implementation below.. Is it possible that when the room is created, the available agent is not the same one that was previously selected?
					if (agent._id) {
						store.setState({ agent });
					}

					// TODO: parentCall
					//parentCall('openWidget');
				});
			}
		});

		if (trigger.runOnce) {
			trigger.skip = true;
			firedTriggers.push(trigger._id);
			store.setState({ firedTriggers })
		}
	};

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
						this._requests.forEach(function(request) {
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
						}, parseInt(condition.value) * 1000);
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

const instance = new TriggersManager();
export default instance;
