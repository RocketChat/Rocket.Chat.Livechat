import { createContext } from 'preact-context';
import { Component } from 'preact';
import { EventEmitter } from 'tiny-events';
import { insert } from 'components/helpers';
import * as SDK from '@rocket.chat/sdk/dist/bundle';
const { livechat } = SDK.api;
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
			this.ddp = this.ddp || await SDK.driver.create({ host: 'http://localhost:3000', timeout: 1000 });
			this.ddp.subscribe('stream-room-messages', state.room._id, { useCollection: false, args: [{ visitorToken: state.user.token }] });
			this.ddp.subscribe('stream-livechat-room', state.room._id, { useCollection: false, args: [{ visitorToken: state.user.token }] });

			await this.ddp.subscribe('stream-notify-room', `${ state.room._id }/typing`, { useCollection: false, args: [{ token: state.user.token }] });
			this.ddp.on('stream-room-messages', (error, { args: [message] }) => {
				this.emit({ messages: insert(getState().messages, message).filter(({ msg }) => msg) });
			}).on('stream-notify-room', (error, { args: [username, isTyping] }) => {
				const { typing } = this.state;
				if (typing.indexOf(username) > -1 || !isTyping) {
					return this.emit({ typing: typing.filter((user) => user !== username) });
				}
				if (isTyping) {
					typing.push(username);
					this.emit({ typing });
				}
			}).on('stream-livechat-room', (error, data) => {
				console.log(data);
			});
		}
		e.emit('change', state);
	}

	async getConfig() {
		const { user: { token } } = getState();
		const { config } = await (token ? livechat.config({ token }) : livechat.config());
		this.emit({ config });
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
			this.ddp = await SDK.driver.create({ host: 'http://localhost:3000', timeout: 1000 });
			this.ddp.subscribe('stream-room-messages', state.room._id, { useCollection: false, args: [{ visitorToken: state.user.token }] });
			this.ddp.subscribe('stream-livechat-room', state.room._id, { useCollection: false, args: [{ visitorToken: state.user.token }] });
			await this.ddp.subscribe('stream-notify-room', `${ state.room._id }/typing`, { useCollection: false, args: [{ token: state.user.token }] });
			this.ddp.on('stream-room-messages', (error, { args: [message] }) => {
				this.emit({ messages: insert(getState().messages, message).filter((e) => e) });
			}).on('stream-notify-room', (error, { args: [username, isTyping] }) => {
				const { typing } = this.state;
				if (typing.indexOf(username) > -1 || !isTyping) {
					return this.emit({ typing: typing.filter((user) => user !== username) });
				}
				if (isTyping) {
					typing.push(username);
					this.emit({ typing });
				}
			}).on('stream-livechat-room', (error, data) => {
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
