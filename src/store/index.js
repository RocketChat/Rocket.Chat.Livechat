import { createContext } from 'preact-context';
import { Component } from 'preact';
import EventEmitter from 'eventemitter2';

const e = new EventEmitter();
let state = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : { config: { messages: {}, settings: {}, theme: {} } };

export const Context = createContext({});

export const getState = () => state;
export const { Consumer } = Context;
export default class UserWrap extends Component {
	actions = (args) => {
		this.setState(args);

	}

	emit = (newState) => {
		state = { ...state, ...newState };
		localStorage.setItem('store', JSON.stringify(state));
		if (newState.user) {
			this.getConfig();
		}
		console.log(state.messages);
		e.emit('change', state);
	}

	async getConfig() {
		const { user } = state;
		const { config } = await fetch(user && user.token ? `http://localhost:3000/api/v1/livechat/config?token=${ user.token }` : 'http://localhost:3000/api/v1/livechat/config?').then((result) => result.json());
		this.emit({ config });
	}

	constructor() {
		super();
		this.state = state;
	}

	async componentDidMount() {
		e.on('change', this.actions);
		this.getConfig();
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
