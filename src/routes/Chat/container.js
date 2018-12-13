import { Component } from 'preact';
import SDK from '../../api';
import { Consumer } from '../../store';
import { getAvatarUrl, uploadFile } from '../../components/helpers';
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
		const { dispatch, token, user } = this.props;

		if (user && user.token) {
			return user;
		}

		const newUser = await SDK.grantVisitor({ visitor: { token } });
		dispatch({ user: newUser });
	}

	getRoom = async() => {
		const { dispatch, token, room } = this.props;

		if (room) {
			return room;
		}

		const newRoom = await SDK.room({ token });
		dispatch({ room: newRoom, messages: [], noMoreMessages: false });
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
		/>
	)
}


export const ChatConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				settings: {
					fileUpload: uploads,
				} = {},
				theme: {
					color,
					title,
				} = {},
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
				messages={messages}
				noMoreMessages={noMoreMessages}
				emoji={false}
				uploads={uploads}
				typingAvatars={Array.isArray(typing) ? typing.map((username) => ({
					description: username,
					src: getAvatarUrl(username),
				})) : []}
				loading={loading}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);


export default ChatConnector;
