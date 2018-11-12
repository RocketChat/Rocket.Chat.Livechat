/* eslint-disable react/sort-comp */
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
	updateCookies = (state) => {
		const { room, user } = state;
		if (room && user && user.token) {
			document.cookie = `rc_rid=${ room._id }; path=/`;
			document.cookie = `rc_token=${ user.token }; path=/`;
			document.cookie = 'rc_room_type=l; path=/';
		}
	}

	async initRoom(state) {
		this.stream = this.stream || await SDK.connect();
		SDK.subscribeRoom(state.room._id, { token: state.user.token, visitorToken: state.user.token });
		SDK.onMessage((message) => {
			this.emit({ messages: insert(getState().messages, message).filter(({ msg }) => msg) });
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

		SDK.on('stream-livechat-room', (error, data) => {
			console.log(data);
		});

		this.updateCookies(state);
	}


	actions = (args) => {
		this.setState(args);
	}

	emit = async (newState) => {
		state = { ...defaultState, ...state, ...newState };
		localStorage.setItem('store', JSON.stringify({ ...state, typing: [] }));

		if (newState.user) {
			this.getConfig();
		}
		if (newState.room) {
			this.initRoom(state);
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
