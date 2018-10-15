import { h, Component } from 'preact';
import { Consumer, getState } from '../store';

import Home from '../routes/home';
let rid = '';
class Wrapped extends Component {
	async sendMessage(msg) {

		const state = getState();
		const { token } = state.user;
		if (!rid) {
			const { room } = await fetch(`http://localhost:3000/api/v1/livechat/room?token=${ token }`).then((res) => res.json());
			rid = room._id;
			this.actions({ room });
		}

		const { messages } = state;
		const { message } = await fetch(`http://localhost:3000/api/v1/livechat/message?token=${ token }&rid=${ rid }`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ msg, token, rid }),
		}).then((res) => res.json());

		this.actions({ messages: [...messages, message].filter((e) => e) });
	}

	constructor() {
		super();
		this.state = {
			loading: true,
		};
		const state = getState();
		rid = state.room && state.room._id;
		this.sendMessage = this.sendMessage.bind(this);
	}
	async componentDidMount() {
		const state = getState();
		const { token } = state.user;

		if (rid) {
			const { messages } = await fetch(`http://localhost:3000/api/v1/livechat/messages.history/${ rid }?token=${ token }`).then((res) => res.json());
			this.actions({ messages: messages.reverse() });
		}
	}
	render(props, { loading }) {
		return (
			<Consumer>
				{
					({ user, dispatch, config: { theme, settings, agent }, messages }) => {
						this.actions = dispatch;
						return (
							<Home
								{...props}
								user={user}
								loading={loading}
								onSubmit={this.sendMessage}
								color={theme.color}
								messages={messages}
								uploads={settings.fileUpload}
								title={agent.username}
							/>);
					}}
			</Consumer>);
	}
}
export default Wrapped;
