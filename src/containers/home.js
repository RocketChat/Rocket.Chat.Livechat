import { h, Component } from 'preact';
import SDK from '../api';
import { Consumer, getState } from '../store';
import Home from '../routes/home';
let rid = '';
class Wrapped extends Component {
	async getRoomId(token) {
		if (!rid) {
			try {
				const { room } = await SDK.room({ token });
				rid = room._id;
				this.actions({ room });
			} catch (error) {
				throw error;
			}
		}
		return rid;
	}

	async sendMessage(msg) {
		const state = getState();
		const { user: { token } } = state;
		this.getRoomId(token).then((rid) => {
			await SDK.sendMessage({ msg, token, rid });
		});

	}

	async onTop() {
		if (this.state.ended) {
			return;
		}
		const state = getState();
		const { user: { token }, messages } = state;
		this.setState({ loading: true });
		const { messages: moreMessages } = await SDK.loadMessages(rid, { token, limit: messages.length + 10 });
		this.setState({ loading: false, ended: messages.length + 10 >= moreMessages.length });
		this.actions({ messages: (moreMessages || []).reverse() });
	}

	onUpload(files) {
		const state = getState();
		const { user: { token } } = state;

		const sendFiles = (files) => {
			files.forEach(async (file) => {
				const formData = new FormData();
				formData.append('file', file);
				await fetch(`http://localhost:3000/api/v1/livechat/upload/${ rid }`, {
					body: formData,
					method: 'POST',
					headers: { 'x-visitor-token': token },
				});
			});
		}

		this.getRoomId(token).then((rid) => {
			sendFiles(files);
		});
	}
	constructor() {
		super();
		this.state = {
			loading: false,
		};
		const state = getState();
		rid = state.room && state.room._id;
		this.sendMessage = this.sendMessage.bind(this);
		this.onTop = this.onTop.bind(this);
		this.onUpload = this.onUpload.bind(this);
	}

	async componentDidMount() {
		const state = getState();
		const { token } = state.user;

		if (rid) {
			this.setState({ loading: true });
			const { messages } = await SDK.loadMessages(rid, { token });
			this.setState({ loading: false });
			this.actions({ messages: (messages || []).reverse() });
		}

	}

	render(props) {
		return (
			<Consumer>
				{
					({ typing, user, dispatch, config: { theme, settings, agent }, messages }) => {
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
								title={agent && agent.username}
							/>);
					}}
			</Consumer>);
	}
}
export default Wrapped;
