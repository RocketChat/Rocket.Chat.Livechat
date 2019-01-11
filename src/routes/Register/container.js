import { Component } from 'preact';
import SDK from '../../api';
import { loadConfig } from '../../lib/main';
import { Consumer } from '../../store';
import Register from './component';


export class RegisterContainer extends Component {

	getDepartment = (fields = {}) => {
		let { department } = fields;

		if (department === '') {
			const { departments = {} } = this.props;
			const deptDefault = departments.filter((dept) => dept.showOnRegistration)[0];
			if (deptDefault) {
				department = deptDefault._id;
			}
		}

		return department;
	}

	handleSubmit = async(fields) => {
		const { dispatch, token } = this.props;
		const department = this.getDepartment(fields);
		Object.assign(fields, { department });

		await dispatch({ loading: true, department });
		try {
			await SDK.grantVisitor({ visitor: { ...fields, token } });
			await loadConfig();
		} finally {
			await dispatch({ loading: false });
		}
	}

	render = (props) => (
		<Register {...props} onSubmit={this.handleSubmit} />
	)
}

export const RegisterConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				departments = {},
				message: {
					registrationFormMessage: message,
				} = {},
				settings: {
					nameFieldRegistrationForm: hasNameField,
					emailFieldRegistrationForm: hasEmailField,
					allowSwitchingDepartments: hasDepartmentField,
				} = {},
				theme: {
					title,
					color,
				} = {},
			} = {},
			loading = false,
			token,
			dispatch,
		}) => (
			<RegisterContainer
				ref={ref}
				{...props}
				title={title || I18n.t('Need help?')}
				color={color}
				message={message || I18n.t('Please, tell us some informations to start the chat')}
				hasNameField={hasNameField}
				hasEmailField={hasEmailField}
				hasDepartmentField={hasDepartmentField}
				departments={departments.filter((dept) => dept.showOnRegistration)}
				loading={loading}
				token={token}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);


export default RegisterConnector;
