import { Component } from 'preact';
import { route } from 'preact-router';
import format from 'date-fns/format';
import { Livechat } from '../../api';
import { Consumer } from '../../store';
import { loadConfig } from '../../lib/main';
import { createToken, insert, getAvatarUrl, renderMessage } from '../../components/helpers';
import Chat from './component';
import { ModalManager } from '../../components/Modal';
import { initRoom, closeChat } from './room';

const UNREAD_MESSAGES_ALERT_ID = 'UNREAD_MESSAGES';

export class ChatContainer extends Component {
	state = { lastReadMessageId: null }

	loadMessages = async() => {
		const { dispatch, room: { _id: rid } = {} } = this.props;

		if (!rid) {
			return;
		}

		await dispatch({ loading: true });
		const messages = await Livechat.loadMessages(rid);
		await initRoom();
		await dispatch({ messages: (messages || []).reverse(), noMoreMessages: false });
		await dispatch({ loading: false });

		if (messages && messages.length) {
			const lastMessage = messages[messages.length - 1];
			this.setState({ lastReadMessageId: lastMessage && lastMessage._id });
		}
	}

	loadMoreMessages = async() => {
		const { dispatch, room: { _id: rid } = {}, messages = [], noMoreMessages = false } = this.props;

		if (!rid || noMoreMessages) {
			return;
		}

		await dispatch({ loading: true });
		const moreMessages = await Livechat.loadMessages(rid, { limit: messages.length + 10 });
		await dispatch({
			messages: (moreMessages || []).reverse(),
			noMoreMessages: messages.length + 10 >= moreMessages.length,
		});
		await dispatch({ loading: false });
	}

	grantUser = async() => {
		const { token, user, guest } = this.props;

		if (user) {
			return user;
		}

		const visitor = { token, ...guest };
		await Livechat.grantVisitor({ visitor });
		await loadConfig();
	}

	getRoom = async() => {
		const { dispatch, room, showConnecting } = this.props;

		if (room) {
			return room;
		}

		const newRoom = await Livechat.room();
		await dispatch({ room: newRoom, messages: [], noMoreMessages: false, connecting: showConnecting });
		await initRoom();

		return newRoom;
	}

	handleTop = () => {
		this.loadMoreMessages();
	}

	handleChangeText = async(text) => {
		const { user, room } = this.props;
		if (!(user && user.username && room && room._id)) {
			return;
		}

		await Livechat.notifyVisitorTyping(room._id, user.username, text.length > 0);
	}

	handleSubmit = async(msg) => {
		if (msg.trim() === '') {
			return;
		}

		await this.grantUser();
		const { _id: rid } = await this.getRoom();
		const { alerts, dispatch, token, user } = this.props;
		try {
			await Livechat.sendMessage({ msg, token, rid });
		} catch (error) {
			await loadConfig();
			const { data: { error: reason } } = error;
			const alert = { id: createToken(), children: reason, error: true, timeout: 5000 };
			await dispatch({ alerts: insert(alerts, alert) });
		}
		await Livechat.notifyVisitorTyping(rid, user.username, false);

	}

	doFileUpload = async(rid, file) => {
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
					message = I18n.t('File exceeds allowed size of __size__.', { size: sizeAllowed });
			}

			const alert = { id: createToken(), children: message, error: true, timeout: 5000 };
			await dispatch({ alerts: insert(alerts, alert) });
		}
	};

	handleUpload = async(files) => {
		await this.grantUser();
		const { _id: rid } = await this.getRoom();

		files.forEach(async(file) => await this.doFileUpload(rid, file));
	}

	handlePlaySound = async() => {
		const { dispatch, sound = {} } = this.props;
		await dispatch({ sound: { ...sound, play: false } });
	}

	onChangeDepartment = () => {
		route('/switch-department');
	}

	onFinishChat = async() => {
		const { success } = await ModalManager.confirm({
			text: 'Are you sure you want to finish this chat?',
		});

		if (!success) {
			return;
		}

		const { alerts, dispatch, room: { _id: rid } = {} } = this.props;

		if (!rid) {
			return;
		}

		await dispatch({ loading: true });
		try {
			await Livechat.closeChat({ rid });
		} catch (error) {
			console.error(error);
			const alert = { id: createToken(), children: 'Error closing chat.', error: true, timeout: 0 };
			await dispatch({ alerts: insert(alerts, alert) });
		} finally {
			await dispatch({ loading: false });
			await closeChat();
		}
	}

	onRemoveUserData = async() => {
		const { success } = await ModalManager.confirm({
			text: 'Are you sure you want to remove all of your personal data?',
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
			const alert = { id: createToken(), children: 'Error removing user data.', error: true, timeout: 0 };
			await dispatch({ alerts: insert(alerts, alert) });
		} finally {
			await loadConfig();
			await dispatch({ loading: false });
			route('/chat-finished');
		}
	}

	canSwitchDepartment = () => {
		const { allowSwitchingDepartments, room, departments = {} } = this.props;
		return allowSwitchingDepartments && room && departments.filter((dept) => dept.showOnRegistration).length > 1;
	}

	canFinishChat = () => {
		const { room } = this.props;
		return room !== undefined;
	}

	canRemoveUserData = () => {
		const { allowRemoveUserData } = this.props;
		return allowRemoveUserData;
	}

	showOptionsMenu = () => (
		this.canSwitchDepartment() || this.canFinishChat() || this.canRemoveUserData()
	)

	componentDidMount() {
		this.loadMessages();
	}

	async componentWillReceiveProps(nextProps) {
		const { lastReadMessageId } = this.state;
		const { messages, alerts, dispatch } = this.props;

		if (nextProps.messages && messages && nextProps.messages.length !== messages.length) {
			if ((nextProps.minimized || !nextProps.visible) && lastReadMessageId) {
				const lastReadMessageIndex = nextProps.messages.findIndex((item) => item._id === lastReadMessageId);
				const unreadMessages = nextProps.messages.slice(lastReadMessageIndex + 1);
				if (unreadMessages.length > 0) {
					const lastReadMessage = nextProps.messages[lastReadMessageIndex];
					const message = I18n.t({
						one: 'One new message since %{since}',
						other: '%{count} new messages since %{since}',
					}, {
						count: unreadMessages.length,
						since: format(lastReadMessage.ts, 'HH:mm [on] MMMM Do'),
					});
					const alert = { id: UNREAD_MESSAGES_ALERT_ID, children: message, success: true, timeout: 0 };
					const newAlerts = alerts.filter((item) => item.id !== UNREAD_MESSAGES_ALERT_ID);
					await dispatch({ alerts: insert(newAlerts, alert), unread: unreadMessages.length });
				}
			} else if (nextProps.visible && !nextProps.minimized) {
				const nextLastMessage = nextProps.messages[nextProps.messages.length - 1];
				const lastMessage = messages[messages.length - 1];
				if (nextLastMessage && lastMessage && nextLastMessage._id !== lastMessage._id) {
					this.setState({ lastReadMessageId: nextLastMessage._id });
					const newAlerts = alerts.filter((item) => item.id !== UNREAD_MESSAGES_ALERT_ID);
					await dispatch({ alerts: newAlerts, unread: null });
				}
			}
		}
	}

	render = (props, state) => (
		<Chat
			{...props}
			onTop={this.handleTop}
			onChangeText={this.handleChangeText}
			onSubmit={this.handleSubmit}
			onUpload={this.handleUpload}
			onPlaySound={this.handlePlaySound}
			options={this.showOptionsMenu()}
			onChangeDepartment={(this.canSwitchDepartment() && this.onChangeDepartment) || null}
			onFinishChat={(this.canFinishChat() && this.onFinishChat) || null}
			onRemoveUserData={(this.canRemoveUserData() && this.onRemoveUserData) || null}
			lastReadMessageId={state.lastReadMessageId}
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
			connecting,
			dispatch,
			alerts,
			visible,
			unread,
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
				user={user ? {
					_id: user._id,
					username: user.username,
					avatar: {
						description: user.username,
						src: getAvatarUrl((user.name && user.name.trim().split(' ')[0]) || user.username),
					},
				} : undefined}
				agent={agent ? {
					_id: agent._id,
					name: agent.name,
					status: agent.status,
					email: agent.emails && agent.emails[0] && agent.emails[0].address,
					username: agent.username,
					avatar: {
						description: agent.username,
						src: getAvatarUrl(agent.username),
					},
					phone: agent.customFields && agent.customFields.phone,
				} : undefined}
				room={room}
				messages={messages.filter((message) => renderMessage(message))}
				noMoreMessages={noMoreMessages}
				emoji={false}
				uploads={uploads}
				typingAvatars={Array.isArray(typing) ? typing.map((username) => ({
					description: username,
					src: getAvatarUrl(username),
				})) : []}
				loading={loading}
				showConnecting={showConnecting} // setting from server that tells if app needs to show "connecting" sometimes
				connecting={connecting} // param to show or hide "connecting"
				dispatch={dispatch}
				departments={departments}
				allowSwitchingDepartments={allowSwitchingDepartments}
				conversationFinishedMessage={conversationFinishedMessage || I18n.t('Conversation finished')}
				allowRemoveUserData={allowRemoveUserData}
				alerts={alerts}
				visible={visible}
				unread={unread}
				guest={guest}
			/>
		)}
	</Consumer>
);


export default ChatConnector;
