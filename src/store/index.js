import { createContext } from 'preact-context';
import { Component } from 'preact';
import EventEmitter from 'eventemitter2';
import { insert } from 'components/helpers';
import * as SDK from '@rocket.chat/sdk/dist/bundle';
const { livechat } = SDK.api;

const e = new EventEmitter();
const defaultState = { config: { messages: {}, settings: {}, theme: {} }, messages: [], user: {} };
let state = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : defaultState;

export const Context = createContext({});

export const getState = () => state || defaultState;
export const { Consumer } = Context;
export default class UserWrap extends Component {
	actions = (args) => {
		this.setState(args);

	}

	emit = async(newState) => {
		state = { ...state, ...newState };
		localStorage.setItem('store', JSON.stringify(state));
		if (newState.user) {
			this.getConfig();
		}
		if (newState.room) {
			await SDK.driver.subscribe('stream-room-messages', newState.room._id, { useCollection: false, args: [{ visitorToken: (newState.user || state.user).token }] });
			SDK.driver.on('stream-room-messages', (error, message) => {
				this.actions({ messages: insert(getState().messages, message).filter((e) => e) });
			});
		}
		e.emit('change', state);
	}

	async getConfig() {
		const { user: { token } } = getState();
		const { config } = await livechat.config({ token });
		this.emit({ config });
		return config;
	}

	constructor() {
		super();
		this.state = state;
	}

	async componentDidMount() {
		this.ddp = await SDK.driver.connect();
		e.on('change', this.actions);
		this.getConfig();
		this.state = state;
		if (state.room) {
			await SDK.driver.subscribe('stream-room-messages', state.room._id, { useCollection: false, args: [{ visitorToken: state.user.token }] });
			SDK.driver.on('stream-room-messages', (error, message) => {
				this.emit({ messages: insert(getState().messages, message).filter((e) => e) });
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

export const connect = (children) => (
	<Consumer>{(...args) =>
		 children
		// return cloneElement(children);// , {}, { props: { ...children.props, dispatch, ...state } });


	}

	</Consumer>);
	// );
// console.log(children, { ...children.props, dispatch, ...state });
