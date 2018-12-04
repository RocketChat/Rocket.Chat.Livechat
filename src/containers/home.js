import { h, Component } from 'preact';
import SDK from '../api';
import { Consumer, store } from '../store';
import Home from '../routes/home';
import { getAvatarUrl } from '../components/helpers';

class Wrapped extends Component {
	async getUser() {
		const { state } = store;
		let { user } = state;
		if (user && user.token) {
			return user;
		}
		this.setState({ loading: true });
		const { token } = state;
		user = await SDK.grantVisitor({ visitor: { token } });
		this.setState({ loading: false });
		this.actions({ user });
		return user;
	}

	async getRoom(token) {
		const { state } = store;
		let { room } = state;

		if (!room) {
			try {
				room = await SDK.room({ token });
				this.actions({ room });
			} catch (error) {
				throw error;
			}
		}
		return room;
	}

	async sendMessage(msg) {
		if (msg.trim() === '') {
			return;
		}

		const stateUser = await this.getUser();
		const { token } = stateUser;

		this.getRoom(token).then(async (room) => {
			await SDK.sendMessage({ msg, token, rid: room._id });
		});

	}

	async onTop() {
		if (this.state.ended) {
			return;
		}
		const { state } = store;
		const { room, messages } = state;
		const rid = room && room._id;

		this.setState({ loading: true });
		const moreMessages = await SDK.loadMessages(rid, { limit: messages.length + 10 });
		this.setState({ loading: false, ended: messages.length + 10 >= moreMessages.length });
		this.actions({ messages: (moreMessages || []).reverse() });
	}

	onUpload(files) {
		const { state } = store;
		const { user: { token } } = state;

		const sendFiles = (files, rid) => {
			files.forEach(async (file) => {
				const formData = new FormData();
				formData.append('file', file);
				await fetch(`http://localhost:3000/api/v1/livechat/upload/${ rid }`, {
					body: formData,
					method: 'POST',
					headers: { 'x-visitor-token': token },
				});
			});
		};

		this.getRoom(token).then((room) => {
			const rid = room && room._id;
			sendFiles(files, rid);
		});
	}

	onPlaySound() {
		const { state } = store;
		const sound = Object.assign(state.sound, { play: false });
		this.actions({ sound });
	}

	notification() {
		const { state } = store;
		const enabled = !state.sound.enabled;
		const sound = Object.assign(state.sound, { enabled });
		this.actions({ sound });
	}

	title(agent, theme) {
		if (agent) {
			return agent.name;
		}
		return (theme && theme.title) || I18n.t('Need help?');
	}

	subTitle(agent) {
		if (!agent) {
			return;
		}

		const { username, emails } = agent;
		if (emails && emails[0]) {
			return emails[0].address;
		}

		return username;
	}

	constructor() {
		super();
		this.state = {
			loading: false,
		};
		const { state } = store;
		const { config: { settings: { fileUpload } } } = state;

		this.sendMessage = this.sendMessage.bind(this);
		this.onTop = this.onTop.bind(this);
		this.onUpload = fileUpload && this.onUpload.bind(this);
		this.onPlaySound = this.onPlaySound.bind(this);
		this.notification = this.notification.bind(this);
	}

	async componentDidMount() {
		const { state } = store;
		const { room, token } = state;

		if (!room) {
			return;
		}

		const rid = room._id;
		this.setState({ loading: true });
		const messages = await SDK.loadMessages(rid, { token });
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({ loading: false });
		this.actions({ messages: (messages || []).reverse() });
	}

	render(props) {
		return (
			<Consumer>
				{
					({ typing, user, dispatch, sound, config: { theme, settings }, agent, messages }) => {
						this.actions = dispatch;
						return (
							<Home
								{...props}
								onTop={this.onTop}
								user={user}
								typingUsers={typing}
								loading={this.state.loading}
								onSubmit={this.sendMessage}
								color={theme.color}
								onUpload={this.onUpload}
								messages={messages}
								uploads={settings.fileUpload}
								title={this.title(agent, theme)}
								subtitle={this.subTitle(agent)}
								src={agent && getAvatarUrl(agent.username)}
								sound={sound}
								onPlaySound={this.onPlaySound}
								notification={this.notification}
							/>);
					}}
			</Consumer>);
	}
}
export default Wrapped;
