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
export default class UserWrap extends Component {
	actions = (args) => {
		this.setState(args);
	}

	emit = async(newState) => {
		state = { ...defaultState, ...state, ...newState };

		localStorage.setItem('store', JSON.stringify({ ...state, typing: [] }));

		if (newState.user) {
			this.getConfig();
		}
		if (newState.room) {
			this.stream = this.stream || await SDK.connect();
			SDK.subscribeRoom(state.room._id, { token: state.user.token, visitorToken: state.user.token });
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
			SDK.on('stream-livechat-room', (error, data) => {
				console.log(data);
			});
		}
		e.emit('change', state);
	}

	async getConfig() {
		const { user: { token } } = getState();
		const { config } = await (token ? SDK.config({ token }) : SDK.config());
		this.emit({ config, room: config.room });
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
			this.stream = await SDK.connect();
			SDK.subscribeRoom(state.room._id, { token: state.user.token, visitorToken: state.user.token });
			SDK.subscribe('stream-livechat-room', state.room._id, { token: state.user.token, visitorToken: state.user.token });
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
			SDK.on('stream-livechat-room', (error, data) => {
				console.log(data);
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
