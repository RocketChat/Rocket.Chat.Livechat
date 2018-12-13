import { Component } from 'preact';
import SDK from '../../api';
import { Consumer } from '../../store';
import { getAvatarUrl, uploadFile } from '../../components/helpers';
import Chat from './component';


export class ChatContainer extends Component {
	loadMessages = async() => {
		const { dispatch, token, room: { _id: rid } = {} } = this.props;

		await dispatch({ loading: true });

		if (rid) {
			const messages = await SDK.loadMessages(rid, { token });
			dispatch({ messages: (messages || []).reverse() });
		}

		await dispatch({ loading: false });
	}

	getUser = async() => {
		const { dispatch, token, user } = this.props;

		if (user && user.token) {
			return user;
		}

		const newUser = await SDK.grantVisitor({ visitor: { token } });
		dispatch({ user: newUser });

		return newUser;
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

	handleTop = async() => {
		const { dispatch, room: { _id: rid } = {}, messages = [], noMoreMessages = false } = this.props;

		if (noMoreMessages) {
			return;
		}

		dispatch({ loading: true });
		const moreMessages = await SDK.loadMessages(rid, { limit: messages.length + 10 });
		dispatch({ noMoreMessages: messages.length + 10 >= moreMessages.length });
		dispatch({ messages: (moreMessages || []).reverse() });
		dispatch({ loading: false });
	}

	handleSubmit = async(msg) => {
		if (msg.trim() === '') {
			return;
		}

		const { token } = await this.getUser();
		const { _id: rid } = await this.getRoom();
		await SDK.sendMessage({ msg, token, rid });
	}

	handleUpload = async(files) => {
		const { token } = await this.getUser();
		const { _id: rid } = await this.getRoom();

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
					token: user.token,
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
