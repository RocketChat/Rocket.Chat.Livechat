import { Component } from 'preact';
import { createContext } from 'preact-context';
import { insert, setCookies, createToken, msgTypesNotDisplayed } from 'components/helpers';
import SDK from '../api';
import Commands from '../lib/commands';
import Store from './Store';


const initialState = {
	token: createToken(),
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

SDK.onMessage((message) => {
	if (message.t === 'command') {
		commands[message.msg] && commands[message.msg](store.state);
	} else if (!msgTypesNotDisplayed.includes(message.t)) {
		store.setState({ messages: insert(store.state.messages, message).filter(({ msg, attachments }) => ({ msg, attachments })) });

		if (message.t === 'livechat-close') {
			// parentCall('callback', 'chat-ended');
		}

		const { sound, user } = store.state;
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

const getConfig = async() => {
	const config = await (token ? SDK.config({ token }) : SDK.config());
	const { room, agent } = config;
	delete config.agent;

	const { sound } = store.state;
	sound.src = config.resources && config.resources.sound;

	store.setState({ config, room, agent, sound });
};

const initRoom = async() => {
	if (stream) {
		return;
	}

	stream = await SDK.connect();

	const { token, agent, room: { _id, servedBy } } = store.state;

	SDK.subscribeRoom(_id);

	if (!agent && servedBy) {
		const { agent } = await SDK.agent({ rid: _id });
		// we're changing the SDK.agent method to return de agent prop instead of the endpoint data
		// so then we'll need to change this method, sending the { agent } object over the emit method

		store.setState({ agent });
	}

	SDK.onAgentChange(_id, (agent) => {
		store.setState({ agent });
	});

	setCookies(_id, token);
};


const StoreContext = createContext();

export class Provider extends Component {
	static displayName = 'StoreProvider'

	dispatch = async(partialState) => {
		await store.setState(partialState);

		if (partialState.user) {
			getConfig();
		}

		if (partialState.room) {
			initRoom();
		}
	}

	state = { ...store.state, dispatch: this.dispatch }

	handleStoreChange = () => {
		this.setState({ ...store.state });
	}

	componentDidMount() {
		store.on('change', this.handleStoreChange);

		getConfig();

		if (store.state.room) {
			initRoom();
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
