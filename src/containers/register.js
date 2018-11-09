import { h, Component } from 'preact';
import SDK from '../api';


import { Consumer } from '../store';
import Register from '../routes/register';

class Wrapped extends Component {
	async onSubmit(args) {
		this.setState({ loading: true });
		const { visitor } = await SDK.grantVisitor({ visitor: { ...args, token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) } });
		this.setState({ loading: false });
		this.actions({ user: visitor });
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
						return (
							<Register
								{...props}
								color={props.theme.color}
								loading={loading}
								title={props.theme.title || I18n.t('Need help?')}
								message={props.messages.registrationFormMessage || I18n.t('Please, tell us some informations to start the chat')}
								onSubmit={this.onSubmit}
							/>
						);
					}}
			</Consumer>);
	}
}
export default Wrapped;
