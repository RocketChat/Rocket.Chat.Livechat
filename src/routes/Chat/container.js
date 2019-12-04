import { Component } from 'preact';
import { route } from 'preact-router';

import { Livechat } from '../../api';
import { Consumer } from '../../store';
import { loadConfig } from '../../lib/main';
import { parentCall, runCallbackEventEmitter } from '../../lib/parentCall';
import constants from '../../lib/constants';
import { createToken, debounce, getAvatarUrl, canRenderMessage, throttle, upsert } from '../../components/helpers';
import Chat from './component';
import { ModalManager } from '../../components/Modal';
import { initRoom, closeChat, loadMessages, loadMoreMessages, defaultRoomParams } from '../../lib/room';
import { normalizeQueueAlert } from '../../lib/api';

export class ChatContainer extends Component {
	state = {
		connectingAgent: false,
		queueSpot: 0,
		triggerQueueMessage: true,
		estimatedWaitTime: null,
	}

	checkConnectingAgent = async () => {
		const { connecting, queueInfo } = this.props;
		const { connectingAgent, queueSpot, estimatedWaitTime } = this.state;

		const newConnecting = connecting;
		const newQueueSpot = (queueInfo && queueInfo.spot) || 0;
		const newEstimatedWaitTime = queueInfo && queueInfo.estimatedWaitTimeSeconds;

		if (newConnecting !== connectingAgent || newQueueSpot !== queueSpot || newEstimatedWaitTime !== estimatedWaitTime) {
			this.state.connectingAgent = newConnecting;
			this.state.queueSpot = newQueueSpot;
			this.state.estimatedWaitTime = newEstimatedWaitTime;
			await this.handleQueueMessage(connecting, queueInfo);
			await this.handleConnectingAgentAlert(newConnecting, normalizeQueueAlert(queueInfo));
		}
	}

	grantUser = async () => {
		const { token, user, guest } = this.props;

		if (user) {
			return user;
		}

		const visitor = { token, ...guest };
		await Livechat.grantVisitor({ visitor });
		await loadConfig();
	}

	getRoom = async () => {
		const { alerts, dispatch, room } = this.props;

		if (room) {
			return room;
		}

		await dispatch({ loading: true });
		try {
			const params = defaultRoomParams();
			const newRoom = await Livechat.room(params);
			await dispatch({ room: newRoom, messages: [], noMoreMessages: false });
			await initRoom();

			parentCall('callback', 'chat-started');
			return newRoom;
		} catch (error) {
			const { data: { error: reason } } = error;
			const alert = { id: createToken(), children: I18n.t('Error starting a new conversation: %{reason}', { reason }), error: true, timeout: 10000 };
			await dispatch({ loading: false, alerts: (alerts.push(alert), alerts) });

			runCallbackEventEmitter(reason);
			throw error;
		} finally {
			await dispatch({ loading: false });
		}
	}

	handleTop = () => {
		loadMoreMessages();
	}

	startTyping = throttle(async ({ rid, username }) => {
		await Livechat.notifyVisitorTyping(rid, username, true);
		this.stopTypingDebounced({ rid, username });
	}, 4500)

	stopTyping = ({ rid, username }) => Livechat.notifyVisitorTyping(rid, username, false)

	stopTypingDebounced = debounce(this.stopTyping, 5000)

	handleChangeText = async () => {
		const { user, room } = this.props;
		if (!(user && user.username && room && room._id)) {
			return;
		}

		this.startTyping({ rid: room._id, username: user.username });
	}

	handleSubmit = async (msg) => {
		if (msg.trim() === '') {
			return;
		}

		await this.grantUser();
		const { _id: rid } = await this.getRoom();
		const { alerts, dispatch, token, user } = this.props;
		try {
			this.stopTypingDebounced.stop();
			await Promise.all([
				this.stopTyping({ rid, username: user.username }),
				Livechat.sendMessage({ msg, token, rid }),
			]);
		} catch (error) {
			const { data: { error: reason } } = error;
			const alert = { id: createToken(), children: reason, error: true, timeout: 5000 };
			await dispatch({ alerts: (alerts.push(alert), alerts) });
		}
		await Livechat.notifyVisitorTyping(rid, user.username, false);
	}

	doFileUpload = async (rid, file) => {
		const { alerts, dispatch } = this.props;

		try {
			await Livechat.uploadFile({ rid, file });
		} catch (error) {
			const { data: { reason, sizeAllowed } } = error;

			let message = I18n.t('FileUpload Error');
			switch (reason) {
				case 'error-type-not-allowed':
					message = I18n.t('Media Types Not Accepted.');
					break;
				case 'error-size-not-allowed':
					message = I18n.t('File exceeds allowed size of %{size}.', { size: sizeAllowed });
			}

			const alert = { id: createToken(), children: message, error: true, timeout: 5000 };
			await dispatch({ alerts: (alerts.push(alert), alerts) });
		}
	};

	handleUpload = async (files) => {
		await this.grantUser();
		const { _id: rid } = await this.getRoom();

		files.forEach((file) => this.doFileUpload(rid, file));
	}

	handleSoundStop = async () => {
		const { dispatch, sound = {} } = this.props;
		await dispatch({ sound: { ...sound, play: false } });
	}

	onChangeDepartment = () => {
		route('/switch-department');
	}

	onFinishChat = async () => {
		const { success } = await ModalManager.confirm({
			text: I18n.t('Are you sure you want to finish this chat?'),
		});

		if (!success) {
			return;
		}

		const { alerts, dispatch, room: { _id: rid } = {} } = this.props;

		await dispatch({ loading: true });
		try {
			if (rid) {
				await Livechat.closeChat({ rid });
			}
		} catch (error) {
			console.error(error);
			const alert = { id: createToken(), children: I18n.t('Error closing chat.'), error: true, timeout: 0 };
			await dispatch({ alerts: (alerts.push(alert), alerts) });
		} finally {
			await dispatch({ loading: false });
			await closeChat();
		}
	}

	onRemoveUserData = async () => {
		const { success } = await ModalManager.confirm({
			text: I18n.t('Are you sure you want to remove all of your personal data?'),
		});

		if (!success) {
			return;
		}

		const { alerts, dispatch } = this.props;

		await dispatch({ loading: true });
		try {
			await Livechat.deleteVisitor();
		} catch (error) {
			console.error(error);
			const alert = { id: createToken(), children: I18n.t('Error removing user data.'), error: true, timeout: 0 };
			await dispatch({ alerts: (alerts.push(alert), alerts) });
		} finally {
			await loadConfig();
			await dispatch({ loading: false });
			route('/chat-finished');
		}
	}

	canSwitchDepartment = () => {
		const { allowSwitchingDepartments, departments = {} } = this.props;
		return allowSwitchingDepartments && departments.filter((dept) => dept.showOnRegistration).length > 1;
	}

	canFinishChat = () => {
		const { room, connecting } = this.props;
		return (room !== undefined) || connecting;
	}

	canRemoveUserData = () => {
		const { allowRemoveUserData } = this.props;
		return allowRemoveUserData;
	}

	showOptionsMenu = () =>
		this.canSwitchDepartment() || this.canFinishChat() || this.canRemoveUserData()


	async handleConnectingAgentAlert(connecting, message) {
		const { alerts: oldAlerts, dispatch } = this.props;
		const { connectingAgentAlertId } = constants;
		const alerts = oldAlerts.filter((item) => item.id !== connectingAgentAlertId);
		if (connecting) {
			alerts.push({
				id: connectingAgentAlertId,
				children: message || I18n.t('Please, wait for the next available agent..'),
				warning: true,
				hideCloseButton: true,
				timeout: 0,
			});
		}

		await dispatch({ alerts });
	}

	async handleQueueMessage(connecting, queueInfo) {
		if (!queueInfo) {
			return;
		}

		const { livechatQueueMessageId } = constants;
		const { message: { text: msg, user: u } = {} } = queueInfo;
		const { triggerQueueMessage } = this.state;

		const { room } = this.props;
		if (!room || !connecting || !msg || !triggerQueueMessage) {
			return;
		}

		this.state.triggerQueueMessage = false;

		const { dispatch, messages } = this.props;
		const ts = new Date();
		const message = { _id: livechatQueueMessageId, msg, u, ts: ts.toISOString() };
		await dispatch({
			messages: upsert(messages, message, ({ _id }) => _id === message._id, ({ ts }) => ts),
		});
	}

	componentDidMount() {
		this.checkConnectingAgent();
		loadMessages();
	}

	async componentWillReceiveProps({ messages: nextMessages, visible: nextVisible, minimized: nextMinimized }) {
		const { messages, alerts, dispatch } = this.props;

		if (nextMessages && messages && nextMessages.length !== messages.length && nextVisible && !nextMinimized) {
			const nextLastMessage = nextMessages[nextMessages.length - 1];
			const lastMessage = messages[messages.length - 1];
			if (
				(nextLastMessage && lastMessage && nextLastMessage._id !== lastMessage._id)
				|| (nextMessages.length === 1 && messages.length === 0)
			) {
				const newAlerts = alerts.filter((item) => item.id !== constants.unreadMessagesAlertId);
				await dispatch({ alerts: newAlerts, unread: null, lastReadMessageId: nextLastMessage._id });
			}
		}
	}

	componentDidUpdate() {
		this.checkConnectingAgent();
	}

	componentWillUnmount() {
		this.handleConnectingAgentAlert(false);
	}

	render = ({ user, ...props }) => (
		<Chat
			{...props}
			avatarResolver={getAvatarUrl}
			uid={user && user._id}
			onTop={this.handleTop}
			onChangeText={this.handleChangeText}
			onSubmit={this.handleSubmit}
			onUpload={this.handleUpload}
			options={this.showOptionsMenu()}
			onChangeDepartment={(this.canSwitchDepartment() && this.onChangeDepartment) || null}
			onFinishChat={(this.canFinishChat() && this.onFinishChat) || null}
			onRemoveUserData={(this.canRemoveUserData() && this.onRemoveUserData) || null}
			onSoundStop={this.handleSoundStop}
		/>
	)
}


export const ChatConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				settings: {
					fileUpload: uploads,
					allowSwitchingDepartments,
					forceAcceptDataProcessingConsent: allowRemoveUserData,
					showConnecting,
				} = {},
				messages: {
					conversationFinishedMessage,
				} = {},
				theme: {
					color,
					title,
				} = {},
				departments = {},
			},
			iframe: {
				theme: {
					color: customColor,
					fontColor: customFontColor,
					iconColor: customIconColor,
				} = {},
				guest,
			} = {},
			token,
			agent,
			sound,
			user,
			room,
			messages,
			noMoreMessages,
			typing,
			loading,
			dispatch,
			alerts,
			visible,
			unread,
			lastReadMessageId,
			triggerAgent,
			queueInfo,
		}) => (
			<ChatContainer
				ref={ref}
				{...props}
				theme={{
					color: customColor || color,
					fontColor: customFontColor,
					iconColor: customIconColor,
				}}
				title={title || I18n.t('Need help?')}
				sound={sound}
				token={token}
				user={user}
				agent={agent ? {
					_id: agent._id,
					name: agent.name,
					status: agent.status,
					email: agent.emails && agent.emails[0] && agent.emails[0].address,
					username: agent.username,
					phone: (agent.phone && agent.phone[0] && agent.phone[0].phoneNumber) || (agent.customFields && agent.customFields.phone),
					avatar: agent.username ? {
						description: agent.username,
						src: getAvatarUrl(agent.username),
					} : undefined,
				} : undefined}
				room={room}
				messages={messages.filter((message) => canRenderMessage(message))}
				noMoreMessages={noMoreMessages}
				emoji={false}
				uploads={uploads}
				typingUsernames={Array.isArray(typing) ? typing : []}
				loading={loading}
				showConnecting={showConnecting} // setting from server that tells if app needs to show "connecting" sometimes
				connecting={!!(room && !agent && (showConnecting || queueInfo))}
				dispatch={dispatch}
				departments={departments}
				allowSwitchingDepartments={allowSwitchingDepartments}
				conversationFinishedMessage={conversationFinishedMessage || I18n.t('Conversation finished')}
				allowRemoveUserData={allowRemoveUserData}
				alerts={alerts}
				visible={visible}
				unread={unread}
				lastReadMessageId={lastReadMessageId}
				guest={guest}
				triggerAgent={triggerAgent}
				queueInfo={queueInfo ? {
					spot: queueInfo.spot,
					estimatedWaitTimeSeconds: queueInfo.estimatedWaitTimeSeconds,
					message: queueInfo.message,
				} : undefined}

			/>
		)}
	</Consumer>
);


export default ChatConnector;
