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
			// TODO: parencall here
			// parentCall('callback', ['pre-chat-form-submit', fields]);
		} finally {
			await dispatch({ loading: false });
		}
	}

	getDepartmentDefault() {
		const { guestDepartment, departments } = this.props;
		if (departments && departments.some((dept) => dept._id === guestDepartment)) {
			return guestDepartment;
		}
	}

	render = (props) => (
		<Register {...props} onSubmit={this.handleSubmit} departmentDefault={this.getDepartmentDefault()} />
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
			iframe: {
				guest: {
					department: guestDepartment,
				} = {},
				theme: {
					customColor,
					customFontColor,
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
				color={customColor || color}
				fontColor={customFontColor}
				message={message || I18n.t('Please, tell us some informations to start the chat')}
				hasNameField={hasNameField}
				hasEmailField={hasEmailField}
				hasDepartmentField={hasDepartmentField}
				departments={departments.filter((dept) => dept.showOnRegistration)}
				guestDepartment={guestDepartment}
				loading={loading}
				token={token}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);


export default RegisterConnector;
