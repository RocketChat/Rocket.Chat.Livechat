import { createContext } from 'preact-context';
import { Component } from 'preact';
import EventEmitter from 'eventemitter2';

const e = new EventEmitter();
let state = {};

export const SettingsContext = createContext({});

export const Settings = SettingsContext.Consumer;

export default class SettingsWrapper extends Component {
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
	async componentDidMount() {
		const { config } = await fetch('http://localhost:3000/api/v1/livechat/config').then((result) => result.json());
		this.actions(config);
		e.on('change', this.actions);
	}
	componentWillUnmount() {
		e.removeListener(this.actions);
	}
	render({ children }) {
		return (
			<SettingsContext .Provider value={{ state: this.state, actions: this.emit }}>
				{children}
			</SettingsContext .Provider>
		);
	}
}
