/* eslint-disable react/sort-comp */
import { createContext } from 'preact-context';
import { Component } from 'preact';
import { EventEmitter } from 'tiny-events';
import { insert } from 'components/helpers';
import SDK from '../api';

const e = new EventEmitter();
const defaultToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const defaultState = { defaultToken, typing: [], config: { messages: {}, settings: {}, theme: {}, triggers: [], departments: [] }, messages: [], user: {} };
let state = localStorage.getItem('store') ? { ...defaultState, ...JSON.parse(localStorage.getItem('store')) } : defaultState;

export const Context = createContext({});

export const getState = () => state || defaultState;
export const { Consumer } = Context;

const { user: { token } } = getState();
if (token) {
	SDK.credentials.token = token;
}

let self;

export default class UserWrap extends Component {
	updateCookies = (state) => {
		const { room, user } = state;
		if (room && user && user.token) {
			document.cookie = `rc_rid=${ room._id }; path=/`;
			document.cookie = `rc_token=${ user.token }; path=/`;
			document.cookie = 'rc_room_type=l; path=/';
		}
	}

	async initRoom(state) {
		if (this.stream) { return; }
		this.stream = SDK.connect();
		await this.stream;

		SDK.subscribeRoom(state.room._id);

		SDK.onMessage((message) => {
			this.emit({ messages: insert(getState().messages, message).filter(({ msg, attachments }) => ({ msg, attachments })) });
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

		SDK.onAgentChange(state.room._id, (agent) => {
			this.emit({ agent });
		});

		this.updateCookies(state);
	}


	actions = (args) => {
		this.setState(args);
	}

	async emit(newState) {
		state = { ...defaultState, ...state, ...newState };
		localStorage.setItem('store', JSON.stringify({ ...state, typing: [] }));

		if (newState.user) {
			self.getConfig();
		}
		if (newState.room) {
			self.initRoom(state);
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

		self = this;
	}

	async componentDidMount() {
		e.on('change', this.actions);
		this.getConfig();
		this.state = state;
		if (state.room) {
			this.initRoom(state);
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
