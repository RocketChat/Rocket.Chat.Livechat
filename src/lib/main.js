import { Livechat } from '../api';
import { route } from 'preact-router';
import store from '../store';
import { insert, setCookies } from '../components/helpers';
import { handleTranscript } from './transcript';
import Commands from './commands';
import { parentCall } from './parentCall';

const commands = new Commands();
let stream;

export const loadConfig = async() => {
	const {
		token,
	} = store.state;

	Livechat.credentials.token = token;

	const {
		agent,
		room,
		guest: user,
		resources: { sound: src = null } = {},
		...config
	} = await Livechat.config({ token });

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
};

export const closeChat = async() => {
	await handleTranscript();
	await loadConfig();
	return route('/chat-finished');
};

const processMessage = async(message) => {
	if (message.t === 'livechat-close') {
		closeChat();
		parentCall('callback', 'chat-ended');
	} else if (message.t === 'command') {
		commands[message.msg] && commands[message.msg]();
	}
};

const doPlaySound = async(message) => {
	const { sound, user } = store.state;

	if (!sound.enabled || message.u._id === user._id) {
		return;
	}

	await store.setState({ sound: { ...sound, play: true } });
};

export const initRoom = async() => {
	const { room, config: { settings: showConnecting } } = store.state;

	if (!room) {
		return;
	}

	if (!stream) {
		stream = await Livechat.connect();
	}

	Livechat.unsubscribeAll();

	const { token, agent, room: { _id: rid, servedBy } } = store.state;
	Livechat.subscribeRoom(rid);

	let roomAgent = agent;
	if (!roomAgent) {
		if (servedBy) {
			roomAgent = await Livechat.agent({ rid });
			store.setState({ roomAgent });
		}

		store.setState({ connecting: !roomAgent && showConnecting });
	}

	Livechat.onAgentChange(rid, (agent) => {
		store.setState({ agent });
	});

	Livechat.onAgentStatusChange(rid, (status) => {
		const { agent } = store.state;
		agent && store.setState({ agent: { ...agent, status } });
	});

	Livechat.onTyping((username, isTyping) => {
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

	Livechat.onMessage(async(message) => {
		await store.setState({
			messages: insert(store.state.messages, message).filter(({ msg, attachments }) => ({ msg, attachments })),
		});
		await processMessage(message);
		await doPlaySound(message);
	});

	setCookies(rid, token);
	parentCall('callback', 'chat-started');
};
