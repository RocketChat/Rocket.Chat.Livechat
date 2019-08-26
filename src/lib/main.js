import format from 'date-fns/format';

import { Livechat } from '../api';
import store from '../store';
import constants from './constants';
import { canRenderMessage } from '../components/helpers';

export const loadConfig = async () => {
	const {
		token,
	} = store.state;

	Livechat.credentials.token = token;

	const {
		agent,
		room,
		guest: user,
		resources: { sound: src = null } = {},
		queueInfo,
		...config
	} = await Livechat.config({ token });

	await store.setState({
		config,
		agent,
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
				since: format(lastReadMessage.ts, 'HH:mm [on] MMMM Do'),
			});
			const alert = { id: constants.unreadMessagesAlertId, children: alertMessage, success: true, timeout: 0 };
			const newAlerts = alerts.filter((item) => item.id !== constants.unreadMessagesAlertId);
			await store.setState({ alerts: (newAlerts.push(alert), newAlerts) });
		}

		await store.setState({ unread: unreadMessages.length });
	}
};
