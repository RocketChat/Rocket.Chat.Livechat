import { Component } from 'preact';
import { createContext } from 'preact-context';
import { insert, setCookies } from 'components/helpers';
import SDK from '../api';
import Commands from '../lib/commands';
import Store from './Store';


const initialState = {
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
	user: null,
	sound: {
		src: '',
		enabled: true,
		play: false,
	},
};

export const store = new Store(initialState);
export const getState = () => store.state;


const commands = new Commands();
let stream;

const msgTypesNotDisplayed = ['livechat_video_call', 'livechat_navigation_history', 'au'];

SDK.onMessage((message) => {
	const { sound, user } = store.state;

	if (message.t === 'command') {
		commands[message.msg] && commands[message.msg](store.state);
	} else if (!msgTypesNotDisplayed.includes(message.t)) {
		store.setState({ messages: insert(store.state.messages, message).filter(({ msg, attachments }) => ({ msg, attachments })) });

		if (message.t === 'livechat-close') {
			// parentCall('callback', 'chat-ended');
		}

		if (sound.enabled && message.u._id !== user._id) {
			sound.play = true;
			return store.setState({ sound });
		}
	}
});

SDK.onTyping((username, isTyping) => {
	const { typing, user } = store.state;

	if (user && user.username && user.username === username) {
		return;
	}

	if (typing.indexOf(username) === -1 && isTyping) {
		typing.push(username);
		return store.setState({ typing });
	}

	if (!isTyping) {
		return store.setState({ typing: typing.filter((u) => u !== username) });
	}
});


const token = store.state.user && store.state.user.token;
SDK.credentials.token = token;


const StoreContext = createContext();

export class Provider extends Component {
	static displayName = 'StoreProvider'

	getConfig = async() => {
		const config = await (token ? SDK.config({ token }) : SDK.config());
		const { room, agent } = config;
		delete config.agent;

		const { sound } = store.state;
		sound.src = config.resources && config.resources.sound;

		store.setState({ config, room, agent, sound });
	}

	initRoom = async() => {
		if (stream) {
			return;
		}

		stream = await SDK.connect();

		SDK.subscribeRoom(store.state.room._id);

		const { agent, room: { _id, servedBy } } = store.state;
		if (!agent && servedBy) {
			const agent = await SDK.agent({ rid: _id });
			// we're changing the SDK.agent method to return de agent prop instead of the endpoint data
			// so then we'll need to change this method, sending the { agent } object over the emit method
			delete agent.success;

			this.dispatch(agent);
		}

		SDK.onAgentChange(store.state.room._id, (agent) => {
			this.dispatch({ agent });
		});

		setCookies(store.state);
	}

	dispatch = async(newState) => {
		await store.setState(newState);

		if (newState.user) {
			this.getConfig();
		}

		if (newState.room) {
			this.initRoom();
		}
	}

	state = { ...store.state, dispatch: this.dispatch }

	handleStoreChange = () => {
		this.setState({ ...store.state });
	}

	componentDidMount() {
		store.on('change', this.handleStoreChange);

		this.getConfig();

		if (store.state.room) {
			this.initRoom();
		}
	}

	componentWillUnmount() {
		store.off('change', this.handleStoreChange);
	}

	render = ({ children }) => (
		<StoreContext.Provider value={this.state}>
			{children}
		</StoreContext.Provider>
	)
}

export class Consumer extends StoreContext.Consumer {
	static displayName = 'StoreConsumer'
}

export default Provider;
