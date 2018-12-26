import SDK from '../api';
import store from '../store';
import { insert, msgTypesNotDisplayed, setCookies } from '../components/helpers';
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
