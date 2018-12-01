import { Component } from 'preact';
import SDK from '../../api';
import { Consumer } from '../../store';
import Register from './component';


export class RegisterContainer extends Component {
	handleSubmit = async(fields) => {
		const { dispatch, token } = this.props;

		await dispatch({ loading: true });
		const user = await SDK.grantVisitor({ visitor: { ...fields, token } });
		await dispatch({ loading: false });
		await dispatch({ token: user.token, user });
	}

	render = ({
		ref,
		loading = false,
		theme: {
			title,
			color,
		} = {},
		strings: {
			registrationFormMessage: message,
		} = {},
		settings: {
			nameFieldRegistrationForm: hasNameField,
			emailFieldRegistrationForm: hasEmailField,
			allowSwitchingDepartments: hasDepartmentField,
		} = {},
	}) => (
		<Register
			ref={ref}
			title={title || I18n.t('Need help?')}
			color={color}
			message={message || I18n.t('Please, tell us some informations to start the chat')}
			hasNameField={hasNameField}
			hasEmailField={hasEmailField}
			hasDepartmentField={hasDepartmentField}
			departments={[]}
			loading={loading}
			onSubmit={this.handleSubmit}
		/>
	)
}


export const RegisterConnector = ({ ref, ...props }) => (
	<Consumer>
		{(state) => <RegisterContainer ref={ref} {...props} {...state} />}
	</Consumer>
);


export default RegisterConnector;
