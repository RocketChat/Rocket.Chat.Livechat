import { Livechat } from '../../api';
import { store } from '../../store';
import { route } from 'preact-router';
import { insert, setCookies } from '../../components/helpers';
import Commands from '../../lib/commands';
import { loadConfig, processUnread } from '../../lib/main';
import { parentCall } from '../../lib/parentCall';
import { handleTranscript } from '../../lib/transcript';

const commands = new Commands();

export const closeChat = async() => {
	await handleTranscript();
	await loadConfig();
	parentCall('callback', 'chat-ended');
	route('/chat-finished');
};

const processMessage = async(message) => {
	if (message.t === 'livechat-close') {
		closeChat();
	} else if (message.t === 'command') {
		commands[message.msg] && commands[message.msg]();
	}
};

const doPlaySound = async(message) => {
	const { sound, user } = store.state;

	if (!sound.enabled || (user && message.u && message.u._id === user._id)) {
		return;
	}

	await store.setState({ sound: { ...sound, play: true } });
};

export const initRoom = async() => {
	const { room, config: { settings: showConnecting } } = store.state;

	if (!room) {
		return;
	}

	Livechat.unsubscribeAll();

	const { token, agent, room: { _id: rid, servedBy } } = store.state;
	Livechat.subscribeRoom(rid);

	let roomAgent = agent;
	if (!roomAgent) {
		if (servedBy) {
			roomAgent = await Livechat.agent({ rid });
			store.setState({ roomAgent });
			await store.setState({ agent: roomAgent });
		}

		const connecting = !!(!roomAgent && showConnecting);
		store.setState({ connecting });
	}

	Livechat.onAgentChange(rid, (agent) => {
		store.setState({ agent });
	});

	Livechat.onAgentStatusChange(rid, (status) => {
		const { agent } = store.state;
		agent && store.setState({ agent: { ...agent, status } });
	});

	setCookies(rid, token);
	parentCall('callback', 'chat-started');
};

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
	await processUnread();
	await doPlaySound(message);
});
