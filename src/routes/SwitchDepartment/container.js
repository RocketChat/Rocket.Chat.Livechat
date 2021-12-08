import { h, Component } from 'preact';
import { withTranslation } from 'react-i18next';

import { Livechat } from '../../api';
import { ModalManager } from '../../components/Modal';
import history from '../../history';
import { loadConfig } from '../../lib/main';
import { createToken } from '../../lib/random';
import { Consumer } from '../../store';
import SwitchDepartment from './component';

class SwitchDepartmentContainer extends Component {
	confirmChangeDepartment = async () => {
		const result = await ModalManager.confirm({
			text: this.props.t('are_you_sure_you_want_to_switch_the_department'),
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
			await dispatch({ user, alerts: (alerts.push({ id: createToken(), children: this.props.t('department_switched'), success: true }), alerts) });
			return history.go(-1);
		}

		await dispatch({ loading: true });
		try {
			const { _id: rid } = room;
			const result = await Livechat.transferChat({ rid, department });
			const { success } = result;
			if (!success) {
				throw this.props.t('no_available_agents_to_transfer');
			}

			await dispatch({ department, loading: false });
			await loadConfig();

			await ModalManager.alert({
				text: this.props.t('department_switched'),
			});

			history.go(-1);
		} catch (error) {
			console.error(error);
			await dispatch({ alerts: (alerts.push({ id: createToken(), children: this.props.t('no_available_agents_to_transfer'), warning: true }), alerts) });
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

export default withTranslation()(SwitchDepartmentContainer);
