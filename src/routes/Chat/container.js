import { Component } from 'preact';
import SDK from '../../api';
import { Consumer, store } from '../../store';
import { getAvatarUrl } from '../../components/helpers';
import Chat from './component';


class ChatContainer extends Component {
	rid = ''

	getUser = async() => {
		const { dispatch } = this.props;

		const { state } = store;
		let { user } = state;
		if (user && user.token) {
			return user;
		}
		dispatch({ loading: true });
		const { defaultToken } = state;
		user = await SDK.grantVisitor({ visitor: { token: defaultToken } });
		dispatch({ loading: false });
		dispatch({ user });
		return user;
	}

	getRoomId = async(token) => {
		const { dispatch } = this.props;

		if (!this.rid) {
			try {
				const room = await SDK.room({ token });
				this.rid = room._id;
				dispatch({ room });
			} catch (error) {
				throw error;
			}
		}
		return this.rid;
	}

	sendMessage = async(msg) => {
		if (msg.trim() === '') {
			return;
		}

		const stateUser = await this.getUser();
		const { token } = stateUser;

		this.getRoomId(token).then(async(rid) => {
			await SDK.sendMessage({ msg, token, rid });
		});

	}

	onTop = async() => {
		const { dispatch } = this.props;

		if (this.state.ended) {
			return;
		}
		const { state } = store;
		const { messages } = state;
		this.setState({ loading: true });
		const moreMessages = await SDK.loadMessages(this.rid, { limit: messages.length + 10 });
		this.setState({ loading: false, ended: messages.length + 10 >= moreMessages.length });
		dispatch({ messages: (moreMessages || []).reverse() });
	}

	onUpload = (files) => {
		const { state } = store;
		const { user: { token } } = state;

		const sendFiles = (files) => {
			files.forEach(async(file) => {
				const formData = new FormData();
				formData.append('file', file);
				await fetch(`http://localhost:3000/api/v1/livechat/upload/${ this.rid }`, {
					body: formData,
					method: 'POST',
					headers: { 'x-visitor-token': token },
				});
			});
		};

		this.getRoomId(token).then(() => {
			sendFiles(files);
		});
	}

	onPlaySound = () => {
		const { dispatch } = this.props;
		const { state } = store;
		const sound = Object.assign(state.sound, { play: false });
		dispatch({ sound });
	}

	notification = () => {
		const { dispatch } = this.props;
		const { state } = store;
		const enabled = !state.sound.enabled;
		const sound = Object.assign(state.sound, { enabled });
		dispatch({ sound });
	}

	constructor(props) {
		super(props);
		const { state } = store;
		const { config: { settings: { fileUpload } } } = state;

		this.rid = state.room && state.room._id;
		this.sendMessage = this.sendMessage.bind(this);
		this.onTop = this.onTop.bind(this);
		this.onUpload = fileUpload && this.onUpload.bind(this);
		this.onPlaySound = this.onPlaySound.bind(this);
		this.notification = this.notification.bind(this);
	}

	async componentDidMount() {
		const { dispatch } = this.props;
		const { state } = store;
		const { token } = state.user;

		if (this.rid) {
			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({ loading: true });
			const messages = await SDK.loadMessages(this.rid, { token });
			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({ loading: false });
			dispatch({ messages: (messages || []).reverse() });
		}
	}

	render = (props) => (
		<Chat
			{...props}
			onTop={this.onTop}
			onSubmit={this.sendMessage}
			onUpload={this.onUpload}
			onPlaySound={this.onPlaySound}
			notification={this.notification}
		/>
	)
}


export const ChatConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			theme: {
				color,
				title,
			} = {},
			settings: {
				fileUpload: uploads,
			} = {},
			agent,
			sound,
			user,
			messages,
			loading,
			typing,
			dispatch,
		}) => (
			<ChatContainer
				ref={ref}
				{...props}
				color={color}
				title={title || I18n.t('Need help?')}
				sound={sound}
				user={user && {
					_id: user._id,
					avatar: {
						description: user.username,
						src: getAvatarUrl(user.username),
					},
				}}
				agent={agent && {
					_id: agent._id,
					name: agent.name,
					status: agent.status,
					email: agent.emails && agent.emails[0] && agent.emails[0].address,
					username: agent.username,
					avatar: {
						description: agent.username,
						src: getAvatarUrl(agent.username),
					},
				}}
				messages={messages}
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
