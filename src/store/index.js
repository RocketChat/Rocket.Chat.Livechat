import { createContext } from 'preact-context';
import { Component } from 'preact';
import { EventEmitter } from 'tiny-events';
import { insert } from 'components/helpers';
import SDK from '../api';

const e = new EventEmitter();
const defaultState = { typing: [], config: { messages: {}, settings: {}, theme: {} }, messages: [], user: {} };
let state = localStorage.getItem('store') ? { ...defaultState, ...JSON.parse(localStorage.getItem('store')) } : defaultState;

export const Context = createContext({});

export const getState = () => state || defaultState;
export const { Consumer } = Context;

const { user: { token } } = getState();
if (token) {
	SDK.credentials.token = token;
}
export default class UserWrap extends Component {
	actions = (args) => {
		this.setState(args);
	}

	async emit(newState) {
		state = { ...defaultState, ...state, ...newState };

		localStorage.setItem('store', JSON.stringify({ ...state, typing: [] }));

		if (newState.user) {
			this.getConfig();
		}
		if (newState.room) {
			if (this.stream) { return ; }
			this.stream = this.stream || SDK.connect();
			await this.stream;
			SDK.subscribeRoom(state.room._id);

			SDK.onMessage((message) => {
				this.emit({ messages: insert(getState().messages, message).filter(({ msg }) => msg) });
			});

			SDK.onTyping((username, isTyping) => {
				const { typing } = this.state;
				if (typing.indexOf(username) > -1 || !isTyping) {
					return this.emit({ typing: typing.filter((user) => user !== username) });
				}
				if (isTyping) {
					typing.push(username);
					this.emit({ typing });
				}
			});

			SDK.onAgentChange(state.room._id, (agent) => {
				this.emit({ agent });
			});
		}
		e.emit('change', state);
	}

	async getConfig() {
		const { user: { token } } = getState();
		SDK.credentials.token = token;
		const config = await (token ? SDK.config({ token }) : SDK.config());
		const { agent } = config;
		delete config.agent;
		this.emit({ config, room: config.room, agent });
		return config;
	}

	constructor() {
		super();
		this.state = state;
	}

	async componentDidMount() {
		e.on('change', this.actions);
		this.getConfig();
		this.state = state;
		if (state.room) {
			this.stream = SDK.connect();
			await this.stream;
			SDK.subscribeRoom(state.room._id);

			SDK.onMessage((message) => {
				this.emit({ messages: insert(getState().messages, message).filter((e) => e) });
			});

			SDK.onTyping((username, isTyping) => {
				const { typing } = this.state;
				if (typing.indexOf(username) > -1 || !isTyping) {
					return this.emit({ typing: typing.filter((user) => user !== username) });
				}
				if (isTyping) {
					typing.push(username);
					this.emit({ typing });
				}
			});

			SDK.onAgentChange(state.room._id, (agent) => {
				this.emit({ agent });
			});
		}
	}
	componentWillUnmount() {
		e.removeListener(this.actions);
	}
	render({ children }) {
		return (
			<Context.Provider value={{ ...this.state, dispatch: this.emit }}>
				{children}
			</Context.Provider>
		);
	}
}
