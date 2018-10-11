import { h, Component } from 'preact';
import { api } from '/Users/guilhermegazzo/Rocket.Chat.js.SDK/dist/';
const { livechat } = api;
import { Consumer, getState } from '../store';
import Home from '../routes/home';
let rid = '';
class Wrapped extends Component {
	async sendMessage(msg) {
		const state = getState();
		const { user: { token } } = state;
		if (!rid) {
			const { room } = await livechat.room({ token });
			rid = room._id;
			this.actions({ room });
		}
		await livechat.sendMessage({ msg, token, rid });
	}

	async onTop() {
		if (this.state.ended) {
			return;
		}
		const state = getState();
		const { user: { token }, messages } = state;
		this.setState({ loading: true });
		const { messages: moreMessages } = await livechat.loadMessages(rid, { token, limit: messages.length + 10 });
		this.setState({ loading: false, ended: messages.length + 10 >= moreMessages.length });
		this.actions({ messages: (moreMessages || []).reverse() });
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
	}

	async componentDidMount() {
		const state = getState();
		const { token } = state.user;

		if (rid) {
			this.setState({ loading: true });
			const { messages } = await livechat.loadMessages(rid, { token });
			this.setState({ loading: false });
			this.actions({ messages: (messages || []).reverse() });
		}

	}
	onUpload(files) {
		console.log(files);
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
