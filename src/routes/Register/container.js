import { Component } from 'preact';
import { route } from 'preact-router';

import { Livechat } from '../../api';
import { parentCall } from '../../lib/parentCall';
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

	handleSubmit = async (fields) => {
		const { dispatch, token } = this.props;
		const department = this.getDepartment(fields);
		Object.assign(fields, { department });

		await dispatch({ loading: true, department });
		try {
			const user = await Livechat.grantVisitor({ visitor: { ...fields, token } });
			await dispatch({ user });
			parentCall('callback', ['pre-chat-form-submit', fields]);
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

	componentDidUpdate(prevProps) {
		const { user: prevUser } = prevProps;
		const { user } = this.props;

		if (!prevUser && user && user._id) {
			route('/');
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
				messages: {
					registrationFormMessage: message,
				} = {},
				settings: {
					nameFieldRegistrationForm: hasNameField,
					emailFieldRegistrationForm: hasEmailField,
				} = {},
				theme: {
					title,
					color,
				} = {},
			} = {},
			iframe: {
				guest: {
					department: guestDepartment,
					name: guestName,
					email: guestEmail,
				} = {},
				theme: {
					color: customColor,
					fontColor: customFontColor,
					iconColor: customIconColor,
					title: customTitle,
				} = {},
			} = {},
			loading = false,
			token,
			dispatch,
			user,
		}) => (
			<RegisterContainer
				ref={ref}
				{...props}
				theme={{
					color: customColor || color,
					fontColor: customFontColor,
					iconColor: customIconColor,
					title: customTitle,
				}}
				title={customTitle || title}
				message={message}
				hasNameField={hasNameField}
				hasEmailField={hasEmailField}
				hasDepartmentField={departments && departments.some((dept) => dept.showOnRegistration)}
				departments={departments.filter((dept) => dept.showOnRegistration)}
				nameDefault={guestName}
				emailDefault={guestEmail}
				guestDepartment={guestDepartment}
				loading={loading}
				token={token}
				dispatch={dispatch}
				user={user}
			/>
		)}
	</Consumer>
);


export default RegisterConnector;
