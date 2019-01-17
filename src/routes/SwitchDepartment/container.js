import { Component } from 'preact';
import SDK from '../../api';
import { loadConfig } from '../../lib/main';
import { Consumer } from '../../store';
import SwitchDepartment from './component';
import { ModalManager } from '../../components/Modal';
import { createToken, insert } from '../../components/helpers';
import history from '../../history';

export class SwitchDepartmentContainer extends Component {

	confirmChangeDepartment = async() => {
		const result = await ModalManager.confirm({
			text: I18n.t('Are you sure you want to switch the department?'),
		});

		return typeof result.success === 'boolean' && result.success;
	}

	handleSubmit = async(fields) => {
		const { alerts, dispatch, room: { _id: rid } = {} } = this.props;
		const { department } = fields;

		const confirm = await this.confirmChangeDepartment();
		if (!confirm) {
			return;
		}

		await dispatch({ loading: true });
		try {
			const result = await SDK.transferChat({ rid, department });
			const { success } = result;
			if (!success) {
				throw I18n.t('No available agents to transfer');
			}

			await dispatch({ department });
			await loadConfig();

			await ModalManager.alert({
				text: I18n.t('Department switched'),
			});

			history.go(-1);
		} catch (error) {
			console.error(error);
			await dispatch({ alerts: insert(alerts, { id: createToken(), children: I18n.t('No available agents to transfer'), warning: true, timeout: 5000 }) });
		} finally {
			await dispatch({ loading: false });
		}
	}

	handleCancel = () => {
		history.go(-1);
	}

	render = (props) => (
		<SwitchDepartment {...props} onSubmit={this.handleSubmit} onCancel={this.handleCancel} />
	)
}

export const SwitchDepartmentConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				departments = {},
				theme: {
					color,
				} = {},
			} = {},
			room = {},
			loading = false,
			department,
			dispatch,
			alerts,
		}) => (
			<SwitchDepartmentContainer
				ref={ref}
				{...props}
				title={I18n.t('Change Department')}
				color={color}
				loading={loading}
				message={I18n.t('Choose a department')}
				departments={departments.filter((dept) => dept.showOnRegistration && dept._id !== department)}
				dispatch={dispatch}
				room={room}
				alerts={alerts}
			/>
		)}
	</Consumer>
);


export default SwitchDepartmentConnector;
