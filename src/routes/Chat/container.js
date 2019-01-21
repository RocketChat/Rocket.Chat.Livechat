import { Component } from 'preact';
import { route } from 'preact-router';
import SDK from '../../api';
import { Consumer } from '../../store';
import { closeChat, initRoom, loadConfig } from '../../lib/main';
import { createToken, insert, getAvatarUrl, renderMessage } from '../../components/helpers';
import Chat from './component';
import { ModalManager } from '../../components/Modal';

export class ChatContainer extends Component {
	state = { lastReadMessageId: null }

	loadMessages = async() => {
		const { dispatch, room: { _id: rid } = {} } = this.props;

		if (!rid) {
			return;
		}

		await dispatch({ loading: true });
		const messages = await SDK.loadMessages(rid);
		await dispatch({ messages: (messages || []).reverse(), noMoreMessages: false });
		await dispatch({ loading: false });
	}

	loadMoreMessages = async() => {
		const { dispatch, room: { _id: rid } = {}, messages = [], noMoreMessages = false } = this.props;

		if (!rid || noMoreMessages) {
			return;
		}

		await dispatch({ loading: true });
		const moreMessages = await SDK.loadMessages(rid, { limit: messages.length + 10 });
		await dispatch({
			messages: (moreMessages || []).reverse(),
			noMoreMessages: messages.length + 10 >= moreMessages.length,
		});
		await dispatch({ loading: false });
	}

	grantUser = async() => {
		const { token, user } = this.props;

		if (user) {
			return user;
		}

		await SDK.grantVisitor({ visitor: { token } });
		await loadConfig();
	}

	getRoom = async() => {
		const { dispatch, room, showConnecting } = this.props;

		if (room) {
			return room;
		}

		const newRoom = await SDK.room();
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

		await SDK.notifyVisitorTyping(room._id, user.username, text.length > 0);
	}

	handleSubmit = async(msg) => {
		if (msg.trim() === '') {
			return;
		}

		// TODO: both grantUser and getRoom ends up calling initRoom
		await this.grantUser();
		const { _id: rid } = await this.getRoom();
		const { alerts, dispatch, token, user } = this.props;
		try {
			await SDK.sendMessage({ msg, token, rid });
		} catch (error) {
			await loadConfig();
			const { data: { error: reason } } = error;
			const alert = { id: createToken(), children: reason, error: true, timeout: 5000 };
			await dispatch({ alerts: insert(alerts, alert) });
		}
		await SDK.notifyVisitorTyping(rid, user.username, false);

	}

	doFileUpload = async(rid, file) => {
		const { alerts, dispatch } = this.props;

		try {
			await SDK.uploadFile({ rid, file });
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
		// TODO: both grantUser and getRoom ends up calling initRoom
		await this.grantUser();
		const { _id: rid } = await this.getRoom();

		files.forEach(async(file) => await this.doFileUpload(rid, file));
	}

	handlePlaySound = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, play: false } });
	}

	onChangeDepartment = () => {
		route('/switch-department');
	}

	doFinishChat = async() => {
		const { alerts, dispatch, room: { _id: rid } = {} } = this.props;

		if (!rid) {
			return;
		}

		await dispatch({ loading: true });
		try {
			await SDK.closeChat({ rid });
		} catch (error) {
			console.error(error);
			const alert = { id: createToken(), children: 'Error closing chat.', error: true, timeout: 0 };
			await dispatch({ alerts: insert(alerts, alert) });
		} finally {
			await dispatch({ loading: false });
			await closeChat();
		}
	}

	onFinishChat = () => {
		ModalManager.confirm({
			text: 'Are you sure you want to finish this chat?',
		}).then((result) => {
			if ((typeof result.success === 'boolean') && result.success) {
				this.doFinishChat();
			}
		});
	}

	doRemoveUserData = async() => {
		const { alerts, dispatch } = this.props;

		await dispatch({ loading: true });
		try {
			await SDK.deleteVisitor();
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

	onRemoveUserData = async() => {
		ModalManager.confirm({
			text: 'Are you sure you want to remove all of your personal data?',
		}).then((result) => {
			if ((typeof result.success === 'boolean') && result.success) {
				this.doRemoveUserData();
			}
		});
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

	componentWillReceiveProps(nextProps) {
		const { messages, visible } = this.props;
		if (nextProps.messages && messages) {
			const nextLastMessage = nextProps.messages[nextProps.messages.length - 1];
			const lastMessage = messages[messages.length - 1];
			if (visible && nextLastMessage && lastMessage && nextLastMessage._id !== lastMessage._id) {
				this.setState({ lastReadMessageId: nextLastMessage._id });
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
		}) => (
			<ChatContainer
				ref={ref}
				{...props}
				color={color}
				title={title || I18n.t('Need help?')}
				sound={sound}
				token={token}
				user={user ? {
					_id: user._id,
					username: user.username,
					avatar: {
						description: user.username,
						src: getAvatarUrl(user.username),
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
			/>
		)}
	</Consumer>
);


export default ChatConnector;
