import { h, Component } from 'preact';

import { Consumer } from '../store';
import Register from '../routes/register';

class Wrapped extends Component {
	async onSubmit(args) {
		this.setState({ loading: true });
		const user = await fetch('http://localhost:3000/api/v1/livechat/visitor', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ visitor: { ...args, token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) } }),
		}).then((res) => res.json());

		const result = await fetch(`http://localhost:3000/api/v1/livechat/messages?token=${ user.visitor.token }`).then((res) => res.json());
		console.log(result);
		this.setState({ loading: false });
		this.actions({ user: user.visitor });
	}

	constructor() {
		super();
		this.state = {
			loading: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	render(props, { loading }) {
		return (
			<Consumer>
				{
					({ dispatch }) => {
						this.actions = dispatch;
						return (<Register color={props.theme.color} {...props} loading={loading} title={I18n.t('Need help?')} onSubmit={this.onSubmit} />);
					}}
			</Consumer>);
	}
}
export default Wrapped;
