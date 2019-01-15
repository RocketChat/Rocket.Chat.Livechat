import SDK from '../api';
import { route } from 'preact-router';
import store from '../store';
import { insert, msgTypesNotDisplayed, setCookies } from '../components/helpers';
import { handleTranscript } from './transcript';
import Commands from './commands';
import { parentCall } from './parentCall';

const commands = new Commands();

SDK.onMessage((message) => {
	if (message.t === 'command') {
		commands[message.msg] && commands[message.msg](store.state);
	} else if (!msgTypesNotDisplayed.includes(message.t)) {
		store.setState({ messages: insert(store.state.messages, message).filter(({ msg, attachments }) => ({ msg, attachments })) });

		if (message.t === 'livechat-close') {
			parentCall('callback', 'chat-ended');
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

let stream;

export const initRoom = async() => {
	const { room } = store.state;

	if (!room) {
		return;
	}

	if (!stream) {
		stream = await SDK.connect();
	}

	SDK.unsubscribeAll();

	const { token, agent, room: { _id: rid, servedBy } } = store.state;
	SDK.subscribeRoom(rid);

	if (!agent && servedBy) {
		const agent = await SDK.agent({ rid });
		store.setState({ agent });
	}

	SDK.onAgentChange(rid, (agent) => {
		store.setState({ agent });
	});

	SDK.onAgentStatusChange(rid, (status) => {
		const { agent } = store.state;
		store.setState({ agent: { ...agent, status } });
	});

	setCookies(rid, token);
	// TODO: parentCall here
	// parentCall('callback', 'chat-started');
};


export const loadConfig = async() => {
	const {
		token,
	} = store.state;

	SDK.credentials.token = token;

	const {
		agent,
		room,
		guest: user,
		resources: { sound: src = null } = {},
		...config
	} = await SDK.config({ token });

	await store.setState({
		config,
		agent,
		room,
		user,
		sound: { src, enabled: true, play: false },
		messages: [],
		alerts: [],
		noMoreMessages: false,
	});

	await initRoom();
};

export const closeChat = async() => {
	await handleTranscript();
	await loadConfig();
	return route('/chat-finished');
};

export const survey = async() => {
	// TODO: Implement survey feedback form
	// route('survey-feedback');
};

const doPlaySound = (message) => {
	const { sound, user } = store.state;
	if (sound.enabled && message.u._id !== user._id) {
		sound.play = true;
		return store.setState({ sound });
	}
};

const onNewMessage = async(message) => {

	if (message.t === 'livechat-close') {
		closeChat();
		// TODO: parentCall here
		// parentCall('callback', 'chat-ended');
	}
};

SDK.onMessage((message) => {
	store.setState({ messages: insert(store.state.messages, message).filter(({ msg, attachments }) => ({ msg, attachments })) });
	onNewMessage(message);
	doPlaySound(message);
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
