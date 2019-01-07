import { Component } from 'preact';
import { route } from 'preact-router';
import SDK from '../../api';
import { Consumer } from '../../store';
import { loadConfig, initRoom } from '../../lib/main';
import { getAvatarUrl, uploadFile, renderMessage } from '../../components/helpers';
import Chat from './component';

export class ChatContainer extends Component {
	loadMessages = async() => {
		const { dispatch, token, room: { _id: rid } = {} } = this.props;

		if (!rid) {
			return;
		}

		await dispatch({ loading: true });
		const messages = await SDK.loadMessages(rid, { token });
		await dispatch({ messages: (messages || []).reverse(), noMoreMessages: false });
		await dispatch({ loading: false });
	}

	loadMoreMessages = async() => {
		const { dispatch, token, room: { _id: rid } = {}, messages = [], noMoreMessages = false } = this.props;

		if (!rid || noMoreMessages) {
			return;
		}

		await dispatch({ loading: true });
		const moreMessages = await SDK.loadMessages(rid, { token, limit: messages.length + 10 });
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
		const { dispatch, token, room } = this.props;

		if (room) {
			return room;
		}

		const newRoom = await SDK.room({ token });
		await dispatch({ room: newRoom, messages: [], noMoreMessages: false });
		await initRoom();

		return newRoom;
	}

	handleTop = () => {
		this.loadMoreMessages();
	}

	handleSubmit = async(msg) => {
		if (msg.trim() === '') {
			return;
		}

		await this.grantUser();
		const { _id: rid } = await this.getRoom();
		const { token } = this.props;
		await SDK.sendMessage({ msg, token, rid });
	}

	handleUpload = async(files) => {
		await this.grantUser();
		const { _id: rid } = await this.getRoom();
		const { token } = this.props;

		files.forEach(async(file) => await uploadFile({ token, rid, file }));
	}

	handlePlaySound = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, play: false } });
	}

	onChangeDepartment = () => {
		const redirect = `/switch-department${ this.props.path }`;
		route(redirect);
	}

	onFinishChat = async() => {
		//TODO: Modal question is missing here..
		const { dispatch, room: { _id: rid } = {} } = this.props;

		if (!rid) {
			return;
		}

		await dispatch({ loading: true });
		try {
			await SDK.closeChat({ rid });
		} catch (error) {
			console.error(error);
		} finally {
			await loadConfig();
			await dispatch({ loading: false });
			//TODO: Modal question here to ask the user about the transcript..
			route('/chat-finished');
		}
	}

	onRemoveUserData = async() => {
		//TODO: Modal question is missing here..
		//This feature depends on this PR: https://github.com/RocketChat/Rocket.Chat.js.SDK/pull/45
		await dispatch({ loading: true });
		try {
			await SDK.deleteVisitor();
		} catch (error) {
			console.error(error);
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
		const { forceAcceptDataProcessingConsent } = this.props;
		return forceAcceptDataProcessingConsent;
	}

	showOptionsMenu = () => {
		return this.canSwitchDepartment() || this.canFinishChat();
	}

	componentDidMount() {
		this.loadMessages();
	}

	render = (props) => (
		<Chat
			{...props}
			onTop={this.handleTop}
			onSubmit={this.handleSubmit}
			onUpload={this.handleUpload}
			onPlaySound={this.handlePlaySound}
			options={this.showOptionsMenu()}
			onChangeDepartment={(this.canSwitchDepartment() && this.onChangeDepartment) || null}
			onFinishChat={(this.canFinishChat() && this.onFinishChat) || null}
			onRemoveUserData={(this.canRemoveUserData() && this.onRemoveUserData) || null}
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
					forceAcceptDataProcessingConsent
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
			dispatch,
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
				} : undefined}
				room={room}
				messages={messages.filter(message => renderMessage(message))}
				noMoreMessages={noMoreMessages}
				emoji={false}
				uploads={uploads}
				typingAvatars={Array.isArray(typing) ? typing.map((username) => ({
					description: username,
					src: getAvatarUrl(username),
				})) : []}
				loading={loading}
				dispatch={dispatch}
				departments={departments}
				allowSwitchingDepartments={allowSwitchingDepartments}
				conversationFinishedMessage={conversationFinishedMessage || I18n.t('Conversation finished')}
			/>
		)}
	</Consumer>
);


export default ChatConnector;
