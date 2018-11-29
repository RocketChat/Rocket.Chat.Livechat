import { h, Component } from 'preact';
import SDK from '../api';
import { Consumer, getState } from '../store';
import Register from '../routes/register';


class Wrapped extends Component {
	async onSubmit(args) {
		this.setState({ loading: true });
		const state = getState();
		const { defaultToken } = state;

		const user = await SDK.grantVisitor({ visitor: { ...args, token: defaultToken } });
		this.setState({ loading: false });
		this.actions({ user });
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
								title={props.theme.title || I18n.t('Need help?')}
								color={props.theme.color}
								message={props.messages.registrationFormMessage || I18n.t('Please, tell us some informations to start the chat')}
								hasNameField={props.settings.nameFieldRegistrationForm}
								hasEmailField={props.settings.emailFieldRegistrationForm}
								hasDepartmentField={props.settings.allowSwitchingDepartments}
								departments={[]}
								loading={loading}
								onSubmit={this.onSubmit}
							/>
						);
					}
				}
			</Consumer>);
	}
}
export default Wrapped;
