import { Component } from 'preact';
import { route } from 'preact-router';
import { Livechat } from '../../api';
import { Consumer } from '../../store';
import { loadConfig } from '../../lib/main';
import constants from '../../lib/constants';
import { createToken, debounce, getAvatarUrl, insert, renderMessage, throttle } from '../../components/helpers';
import Chat from './component';
import { ModalManager } from '../../components/Modal';
import { initRoom, closeChat } from './room';

export class ChatContainer extends Component {
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

	startTyping = throttle(async({ rid, username }) => {
		await Livechat.notifyVisitorTyping(rid, username, true);
		this.stopTypingDebounced({ rid, username });
	}, 4500)

	stopTyping = ({ rid, username }) => Livechat.notifyVisitorTyping(rid, username, false)

	stopTypingDebounced = debounce(this.stopTyping, 5000)

	handleChangeText = async() => {
		const { user, room } = this.props;
		if (!(user && user.username && room && room._id)) {
			return;
		}

		this.startTyping({ rid: room._id, username: user.username });
	}

	handleSubmit = async(msg) => {
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
					message = I18n.t('File exceeds allowed size of %{size}.', { size: sizeAllowed });
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

	handleSoundStop = async() => {
		const { dispatch, sound = {} } = this.props;
		await dispatch({ sound: { ...sound, play: false } });
	}

	onChangeDepartment = () => {
		route('/switch-department');
	}

	onFinishChat = async() => {
		const { success } = await ModalManager.confirm({
			text: I18n.t('Are you sure you want to finish this chat?'),
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

	async componentWillReceiveProps({ messages: nextMessages, visible: nextVisible, minimized: nextMinimized }) {
		const { messages, alerts, dispatch } = this.props;

		if (nextMessages && messages && nextMessages.length !== messages.length && nextVisible && !nextMinimized) {
			const nextLastMessage = nextMessages[nextMessages.length - 1];
			const lastMessage = messages[messages.length - 1];
			if (
				(nextLastMessage && lastMessage && nextLastMessage._id !== lastMessage._id) ||
				(nextMessages.length === 1 && messages.length === 0)
			) {
				const newAlerts = alerts.filter((item) => item.id !== constants.unreadMessagesAlertId);
				await dispatch({ alerts: newAlerts, unread: null, lastReadMessageId: nextLastMessage._id });
			}
		}
	}

	render = ({ user, ...props }) => (
		<Chat
			{...props}
			avatarResolver={getAvatarUrl}
			uid={user._id}
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
			connecting,
			dispatch,
			alerts,
			visible,
			unread,
			lastReadMessageId,
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
					phone: agent.customFields && agent.customFields.phone,
				} : undefined}
				room={room}
				messages={messages.filter((message) => renderMessage(message))}
				noMoreMessages={noMoreMessages}
				emoji={false}
				uploads={uploads}
				typingUsernames={Array.isArray(typing) ? typing : []}
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
				lastReadMessageId={lastReadMessageId}
				guest={guest}
			/>
		)}
	</Consumer>
);


export default ChatConnector;
