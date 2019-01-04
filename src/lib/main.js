import SDK from '../api';
import store from '../store';
import { insert, setCookies } from '../components/helpers';
import * as commands from './commands';

const doPlaySound = (message) => {
	const { sound, user } = store.state;
	if (sound.enabled && message.u._id !== user._id) {
		sound.play = true;
		return store.setState({ sound });
	}
}

const onNewMessage = (message) => {
	if (message.t === 'command') {
		commands[message.msg] && commands[message.msg](store.state);
	}

	if (message.t === 'livechat-close') {

		// parentCall('callback', 'chat-ended');
	}
}

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

let stream;

export const initRoom = async() => {
	const { room } = store.state;

	if (!room) {
		return;
	}

	if (stream) {
		return;
	}

	stream = await SDK.connect();

	const { token, agent, room: { _id: rid, servedBy } } = store.state;
	SDK.subscribeRoom(rid);

	if (!agent && servedBy) {
		const { agent } = await SDK.agent({ rid });
		// we're changing the SDK.agent method to return de agent prop instead of the endpoint data
		// so then we'll need to change this method, sending the { agent } object over the emit method

		store.setState({ agent });
	}

	SDK.onAgentChange(rid, (agent) => {
		store.setState({ agent });
	});

	setCookies(rid, token);
};


export const loadConfig = async() => {
	const {
		token,
		agent: prevAgent,
		room: prevRoom,
		user: prevUser,
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
		agent: agent || prevAgent,
		room: room || prevRoom,
		user: user || prevUser,
		sound: { src, enabled: true, play: false },
	});

	await initRoom();
};
