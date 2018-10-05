import { createContext } from 'preact-context';
import { Component } from 'preact';
import EventEmitter from 'eventemitter2';

const e = new EventEmitter();
let state = {};

export const UserContext = createContext({});

export default class User extends Component {
	actions = (...args) => {
		this.setState(...args);
	}

	emit = (newState) => {
		state = { ...state, ...newState };
		e.emit('change', state);
	}

	constructor() {
		super();
		this.state = {};
	}
	componentDidMount() {
		e.on('change', this.actions);
	}
	componentWillUnmount() {
		e.removeListener(this.actions);
	}
	render({ children }) {
		return (
			<UserContext.Provider value={{ state: this.state, actions: this.emit }}>
				{children}
			</UserContext.Provider>
		);
	}
}
