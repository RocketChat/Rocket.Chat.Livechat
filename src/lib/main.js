import format from 'date-fns/format';
import { parseISO } from 'date-fns/fp';

import { Livechat } from '../api';
import { canRenderMessage } from '../components/helpers';
import I18n from '../i18n';
import store from '../store';
import constants from './constants';

export const updateBusinessUnit = async (newBusinessUnit) => {
	const {
		token,
		config: existingConfig,
	} = store.state;
	if (!token) {
		throw new Error('Error! no livechat token found. please make sure you initialize widget first before setting business unit');
	}

	const { departments } = await Livechat.config({
		token,
		...newBusinessUnit && { businessUnit: newBusinessUnit },
	});

	if (newBusinessUnit) {
		return store.setState({
			config: {
				...existingConfig,
				departments,
			},
			businessUnit: newBusinessUnit,
		});
	}

	await store.setState({
		config: {
			...existingConfig,
			departments,
		},
	});
	await store.unsetSinglePropInStateByName('businessUnit');
};

export const loadConfig = async () => {
	const {
		token,
		businessUnit = null,
	} = store.state;

	Livechat.credentials.token = token;

	const {
		agent,
		room,
		guest: user,
		resources: { sound: src = null } = {},
		queueInfo,
		...config
	} = await Livechat.config({
		token,
		...businessUnit && { businessUnit },
	});

	await store.setState({
		config,
		agent: agent && agent.hiddenInfo ? { hiddenInfo: true } : agent, // TODO: revert it when the API is updated
		room,
		user,
		queueInfo,
		sound: { src, enabled: true, play: false },
		messages: [],
		typing: [],
		noMoreMessages: false,
		visible: true,
		unread: null,
	});
};

export const processUnread = async () => {
	const { minimized, visible, messages } = store.state;
	if (minimized || !visible) {
		const { alerts, lastReadMessageId } = store.state;
		const renderedMessages = messages.filter((message) => canRenderMessage(message));
		const lastReadMessageIndex = renderedMessages.findIndex((item) => item._id === lastReadMessageId);
		const unreadMessages = renderedMessages.slice(lastReadMessageIndex + 1);

		if (lastReadMessageIndex !== -1) {
			const lastReadMessage = renderedMessages[lastReadMessageIndex];
			const alertMessage = I18n.t({
				one: 'One new message since %{since}',
				other: '%{count} new messages since %{since}',
			}, {
				count: unreadMessages.length,
				since: format(parseISO(lastReadMessage.ts), 'HH:mm MMM dd'),
			});
			const alert = { id: constants.unreadMessagesAlertId, children: alertMessage, success: true, timeout: 0 };
			const newAlerts = alerts.filter((item) => item.id !== constants.unreadMessagesAlertId);
			await store.setState({ alerts: (newAlerts.push(alert), newAlerts) });
		}

		await store.setState({ unread: unreadMessages.length });
	}
};
