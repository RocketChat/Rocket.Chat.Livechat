import { Component } from 'preact';
import { createContext } from 'preact-context';
import { insert, setCookies } from 'components/helpers';
import SDK from '../api';
import Commands from '../lib/commands';
import Store from './Store';


const defaultState = {
	defaultToken: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
	typing: [],
	config: {
		messages: {},
		settings: {},
		theme: {},
		triggers: [],
		departments: [],
		resources: {},
	},
	messages: [],
	user: {},
	sound: {
		src: '',
		enabled: true,
		play: false,
	},
};

const store = new Store(defaultState);

export const Context = createContext({});

export const getState = () => store.state;
export const { Consumer } = Context;

const { user: { token } } = getState();
if (token) {
	SDK.credentials.token = token;
}

let self;

const commands = new Commands();

export default class UserWrap extends Component {
	async initRoom(state) {
		if (this.stream) { return; }
		this.stream = SDK.connect();
		await this.stream;

		SDK.subscribeRoom(state.room._id);
		const { sound, user } = state;
		const msgTypesNotDisplayed = ['livechat_video_call', 'livechat_navigation_history', 'au'];

		SDK.onMessage((message) => {
			if (message.t === 'command') {
				commands[message.msg] && commands[message.msg](state);
			} else if (!msgTypesNotDisplayed.includes(message.t)) {
				this.emit({ messages: insert(getState().messages, message).filter(({ msg, attachments }) => ({ msg, attachments })) });

				if (message.t === 'livechat-close') {
					// parentCall('callback', 'chat-ended');
				}

				if (sound.enabled && message.u._id !== user._id) {
					sound.play = true;
					return this.emit({ sound });
				}
			}
		});

		SDK.onTyping((username, isTyping) => {
			const { typing, user } = this.state;

			if (user && user.username && user.username === username) {
				return;
			}

			if (typing.indexOf(username) === -1 && isTyping) {
				typing.push(username);
				return this.emit({ typing });
			}

			if (!isTyping) {
				return this.emit({ typing: typing.filter((u) => u !== username) });
			}
		});

		const { agent, room: { _id, servedBy } } = state;
		if (!agent && servedBy) {
			const agent = await SDK.agent({ rid: _id });
			// we're changing the SDK.agent method to return de agent prop instead of the endpoint data
			// so then we'll need to change this method, sending the { agent } object over the emit method
			delete agent.success;

			this.emit(agent);
		}

		SDK.onAgentChange(state.room._id, (agent) => {
			this.emit({ agent });
		});

		setCookies(state);
	}


	actions = (args) => {
		this.setState(args);
	}

	async emit(newState) {
		await store.morph(newState);

		if (newState.user) {
			self.getConfig();
		}

		if (newState.room) {
			self.initRoom(store.state);
		}

		store.emit('change', store.state);
	}

	async getConfig() {
		const { sound, user: { token } } = getState();
		SDK.credentials.token = token;
		const config = await (token ? SDK.config({ token }) : SDK.config());
		const { agent } = config;
		delete config.agent;

		sound.src = config.resources && config.resources.sound;

		this.emit({ config, room: config.room, agent, sound });
		return config;
	}

	constructor() {
		super();
		this.state = store.state;

		self = this;
	}

	async componentDidMount() {
		store.on('change', this.actions);
		this.getConfig();
		this.state = store.state;
		if (store.state.room) {
			this.initRoom(store.state);
		}
	}
	componentWillUnmount() {
		store.removeListener(this.actions);
	}
	render({ children }) {
		return (
			<Context.Provider value={{ ...this.state, dispatch: this.emit }}>
				{children}
			</Context.Provider>
		);
	}
}
