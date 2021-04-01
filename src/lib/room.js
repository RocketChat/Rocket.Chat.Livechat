import { route } from 'preact-router';

import { Livechat } from '../api';
import { setCookies, upsert, canRenderMessage } from '../components/helpers';
import { store } from '../store';
import { normalizeAgent } from './api';
import Commands from './commands';
import { handleIdleTimeout } from './idleTimeout';
import { loadConfig, processUnread } from './main';
import { parentCall } from './parentCall';
import { normalizeMessage, normalizeMessages } from './threads';
import { handleTranscript } from './transcript';

const commands = new Commands();
export const CLOSE_CHAT = 'Close Chat';

export const onChatClose = async () => {
	console.log(store);
	store.setState({ composerConfig: { disable: false, disableText: 'Please Wait', onDisabledComposerClick: () => {} } });
	await loadConfig();
	route('/chat-finished');
	store.setState({ alerts: [] });
};

export const closeChat = async ({ transcriptRequested } = {}) => {
	store.setState({ alerts: [] });
	if (!transcriptRequested) {
		await handleTranscript();
	}
	parentCall('callback', 'chat-ended');
	store.setState({ composerConfig: {
		disable: true,
		disableText: CLOSE_CHAT,
		onDisabledComposerClick: onChatClose,
	},
	});
};

const disableComposer = (msg) => {
	const defaultText = 'Please Wait';
	const result = { disable: false, disableText: defaultText };

	if (!msg) {
		return result;
	}

	const { customFields = {}, attachments = [] } = msg;

	if (customFields.disableInput) {
		return { disable: true, disableText: customFields.disableInputMessage || defaultText };
	}

	for (let i = 0; i < attachments.length; i++) {
		const { actions = [] } = attachments[i];

		for (let j = 0; j < actions.length; j++) {
			const { disableInput, disableInputMessage } = actions[j];
			if (disableInput) {
				return { disable: true, disableText: disableInputMessage || defaultText };
			}
		}
	}

	return result;
};

const processMessage = async (message) => {
	if (message.t === 'livechat-close') {
		closeChat(message);
		handleIdleTimeout({
			idleTimeoutAction: 'stop',
		});
	} else if (message.t === 'command') {
		commands[message.msg] && commands[message.msg]();
	}

	const { messages, composerConfig } = store.state;
	if (messages && messages.length) {
		const lastMessage = messages[messages.length - 1];
		if (message._id === lastMessage._id) {
			const { disable, disableText } = disableComposer(message);
			if (disable) {
				store.setState({ composerConfig: { disable: true, disableText, onDisabledComposerClick: () => {} } });
			} else if (composerConfig && composerConfig.disableText !== CLOSE_CHAT) {
				store.setState({ composerConfig: { disable: false, disableText: 'Please Wait', onDisabledComposerClick: () => {} } });
			}
		}
	}
};

const doPlaySound = async (message) => {
	const { sound, user } = store.state;

	if (!sound.enabled || (user && message.u && message.u._id === user._id)) {
		return;
	}

	await store.setState({ sound: { ...sound, play: true } });
};

export const initRoom = async () => {
	const { state } = store;
	const { room } = state;

	if (!room) {
		return;
	}

	Livechat.unsubscribeAll();

	const { token, agent, queueInfo, room: { _id: rid, servedBy } } = state;
	Livechat.subscribeRoom(rid);

	let roomAgent = agent;
	if (!roomAgent) {
		if (servedBy) {
			roomAgent = await Livechat.agent({ rid });
			await store.setState({ agent: roomAgent, queueInfo: null });
			parentCall('callback', ['assign-agent', normalizeAgent(roomAgent)]);
		}
	}

	if (queueInfo) {
		parentCall('callback', ['queue-position-change', queueInfo]);
	}

	Livechat.onAgentChange(rid, async (agent) => {
		await store.setState({ agent, queueInfo: null });
		parentCall('callback', ['assign-agent', normalizeAgent(agent)]);
	});

	Livechat.onAgentStatusChange(rid, (status) => {
		const { agent } = store.state;
		agent && store.setState({ agent: { ...agent, status } });
		parentCall('callback', ['agent-status-change', normalizeAgent(agent)]);
	});

	Livechat.onQueuePositionChange(rid, async (queueInfo) => {
		await store.setState({ queueInfo });
		parentCall('callback', ['queue-position-change', queueInfo]);
	});

	setCookies(rid, token);
};

const isAgentHidden = () => {
	const { config: { settings: { agentHiddenInfo } = {} } = {} } = store.state;

	return !!agentHiddenInfo;
};

const transformAgentInformationOnMessage = (message) => {
	const { user } = store.state;
	if (message.u && message.u._id !== user._id && isAgentHidden()) {
		return { ...message, u: { _id: message.u._id } };
	}

	return message;
};

Livechat.onTyping((username, isTyping) => {
	const { typing, user, agent } = store.state;

	if (user && user.username && user.username === username) {
		return;
	}

	if (agent && agent.hiddenInfo) {
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

Livechat.onMessage(async (message) => {
	if (message.ts instanceof Date) {
		message.ts = message.ts.toISOString();
	}

	message = await normalizeMessage(message);
	if (!message) {
		return;
	}

	message = transformAgentInformationOnMessage(message);

	await store.setState({
		messages: upsert(store.state.messages, message, ({ _id }) => _id === message._id, ({ ts }) => ts),
	});

	// Viasat : Timeout Warnings
	if (message.customFields && message.customFields.idleTimeoutConfig) {
		handleIdleTimeout(message.customFields.idleTimeoutConfig);
	} else {
		handleIdleTimeout({
			idleTimeoutAction: 'stop',
		});
	}

	if (message.customFields) {
		if (message.customFields.sneakPeekEnabled !== undefined || message.customFields.sneakPeekEnabled !== null) {
			store.setState({ sneakPeekEnabled: message.customFields.sneakPeekEnabled });
		}
	}

	await processMessage(message);

	if (canRenderMessage(message) !== true) {
		return;
	}

	if (message.editedAt) {
		return;
	}

	await processUnread();
	await doPlaySound(message);
});

export const getGreetingMessages = (messages) => messages && messages.filter((msg) => msg.trigger);

export const loadMessages = async () => {
	const { messages: storedMessages, room: { _id: rid } = {} } = store.state;
	const previousMessages = getGreetingMessages(storedMessages);

	if (!rid) {
		return;
	}

	await store.setState({ loading: true });
	const rawMessages = (await Livechat.loadMessages(rid)).concat(previousMessages);
	const messages = (await normalizeMessages(rawMessages)).map(transformAgentInformationOnMessage).map((message) => {
		const oldMessage = storedMessages.find((x) => x._id === message._id);
		if (oldMessage && oldMessage.actionsVisible !== undefined) {
			message.actionsVisible = oldMessage.actionsVisible;
		}
		return message;
	});

	await initRoom();
	await store.setState({ messages: (messages || []).reverse(), noMoreMessages: false, loading: false });

	if (messages && messages.length) {
		const lastMessage = messages[messages.length - 1];
		await store.setState({ lastReadMessageId: lastMessage && lastMessage._id });

		const { disable, disableText } = disableComposer(lastMessage);

		if (disable) {
			store.setState({ composerConfig: { disable: true, disableText, onDisabledComposerClick: () => {} } });
		}
	}

	const { idleTimeout } = store.state;

	if (idleTimeout && idleTimeout.idleTimeoutRunning) {
		const {
			idleTimeoutMessage,
			idleTimeoutWarningTime,
			idleTimeoutTimeoutTime,
		} = idleTimeout;
		handleIdleTimeout({
			idleTimeoutAction: 'start',
			idleTimeoutMessage,
			idleTimeoutWarningTime,
			idleTimeoutTimeoutTime,
		});
	}
};

export const loadMoreMessages = async () => {
	const { room: { _id: rid } = {}, messages = [], noMoreMessages = false } = store.state;

	if (!rid || noMoreMessages) {
		return;
	}

	await store.setState({ loading: true });

	const rawMessages = await Livechat.loadMessages(rid, { limit: messages.length + 10 });
	const moreMessages = (await normalizeMessages(rawMessages)).map(transformAgentInformationOnMessage).map((message) => {
		const { _id } = message;
		const oldMessage = messages.find((x) => x._id === _id);
		if (oldMessage && oldMessage.actionsVisible !== undefined) {
			message.actionsVisible = oldMessage.actionsVisible;
		}
		return message;
	});

	await store.setState({
		messages: (moreMessages || []).reverse(),
		noMoreMessages: messages.length + 10 > moreMessages.length,
		loading: false,
	});
};

export const defaultRoomParams = () => {
	const params = {};

	const { defaultAgent: agent = {} } = store.state;
	if (agent && agent._id) {
		Object.assign(params, { agentId: agent._id });
	}

	return params;
};

export const assignRoom = async () => {
	const { defaultAgent: agent = {}, room } = store.state;
	const params = {};

	if (room) {
		return;
	}

	if (agent && agent._id) {
		Object.assign(params, { agentId: agent._id });
	}

	const newRoom = await Livechat.room(params);
	await store.setState({ room: newRoom });
	await initRoom();
};

store.on('change', ([state, prevState]) => {
	// Cross-tab communication
	// Detects when a room is created and then route to the correct container
	if (!prevState.room && state.room) {
		route('/');
	}
});
