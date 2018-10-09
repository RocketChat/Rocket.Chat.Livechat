import { h, Component } from 'preact';
import { api } from '@rocket.chat/sdk/dist/bundle';
const { livechat } = api;
import { Consumer, getState } from '../store';
import Home from '../routes/home';
let rid = '';
class Wrapped extends Component {
	async sendMessage(msg) {
		const state = getState();
		const { user: { token }, messages } = state;
		if (!rid) {
			const { room } = await livechat.room({ token });
			rid = room._id;
			this.actions({ room });
		}
		const { message } = await livechat.sendMessage({ msg, token, rid });
		// this.actions({ messages: insert(messages, message).filter((e) => e) });
	}

	async onTop() {
		console.log('ontop');
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

	render(props) {
		return (
			<Consumer>
				{
					({ user, dispatch, config: { theme, settings, agent }, messages }) => {
						this.actions = dispatch;
						return (
							<Home
								{...props}
								onTop={this.onTop}
								user={user}
								loading={this.state.loading}
								onSubmit={this.sendMessage}
								color={theme.color}
								messages={messages}
								uploads={settings.fileUpload}
								title={agent && agent.username}
							/>);
					}}
			</Consumer>);
	}
}
export default Wrapped;
