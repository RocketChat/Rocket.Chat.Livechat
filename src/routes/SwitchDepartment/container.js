import { h, Component } from 'preact';

import { Livechat } from '../../api';
import { ModalManager } from '../../components/Modal';
import history from '../../history';
import I18n from '../../i18n';
import { loadConfig } from '../../lib/main';
import { createToken } from '../../lib/random';
import { Consumer } from '../../store';
import SwitchDepartment from './component';

export class SwitchDepartmentContainer extends Component {
	confirmChangeDepartment = async () => {
		const result = await ModalManager.confirm({
			text: I18n.t('Are you sure you want to switch the department?'),
		});

		return typeof result.success === 'boolean' && result.success;
	}

	handleSubmit = async (fields) => {
		const { alerts, dispatch, room, token } = this.props;
		const { department } = fields;

		const confirm = await this.confirmChangeDepartment();
		if (!confirm) {
			return;
		}

		if (!room) {
			const user = await Livechat.grantVisitor({ visitor: { department, token } });
			await dispatch({ user, alerts: (alerts.push({ id: createToken(), children: I18n.t('Department switched'), success: true }), alerts) });
			return history.go(-1);
		}

		await dispatch({ loading: true });
		try {
			const { _id: rid } = room;
			const result = await Livechat.transferChat({ rid, department });
			const { success } = result;
			if (!success) {
				throw I18n.t('No available agents to transfer');
			}

			await dispatch({ department, loading: false });
			await loadConfig();

			await ModalManager.alert({
				text: I18n.t('Department switched'),
			});

			history.go(-1);
		} catch (error) {
			console.error(error);
			await dispatch({ alerts: (alerts.push({ id: createToken(), children: I18n.t('No available agents to transfer'), warning: true }), alerts) });
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
			iframe: {
				theme: {
					color: customColor,
					fontColor: customFontColor,
					iconColor: customIconColor,
				} = {},
			} = {},
			room,
			loading = false,
			department,
			dispatch,
			alerts,
			token,
		}) => (
			<SwitchDepartmentContainer
				ref={ref}
				{...props}
				theme={{
					color: customColor || color,
					fontColor: customFontColor,
					iconColor: customIconColor,
				}}
				loading={loading}
				departments={departments.filter((dept) => dept.showOnRegistration && dept._id !== department)}
				dispatch={dispatch}
				room={room}
				alerts={alerts}
				token={token}
			/>
		)}
	</Consumer>
);


export default SwitchDepartmentConnector;
