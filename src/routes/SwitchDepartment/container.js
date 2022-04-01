import { h, Component } from 'preact';
import { withTranslation } from 'react-i18next';

import { Livechat } from '../../api';
import { ModalManager } from '../../components/Modal';
import history from '../../history';
import { loadConfig } from '../../lib/main';
import { createToken } from '../../lib/random';
import SwitchDepartment from './component';

class SwitchDepartmentContainer extends Component {
	confirmChangeDepartment = async () => {
		const { i18n } = this.props;
		const result = await ModalManager.confirm({
			text: i18n.t('are_you_sure_you_want_to_switch_the_department'),
		});

		return typeof result.success === 'boolean' && result.success;
	}

	handleSubmit = async (fields) => {
		const { alerts, dispatch, room, token, t } = this.props;
		const { department } = fields;

		const confirm = await this.confirmChangeDepartment();
		if (!confirm) {
			return;
		}

		if (!room) {
			const user = await Livechat.grantVisitor({ visitor: { department, token } });
			await dispatch({ user, alerts: (alerts.push({ id: createToken(), children: t('department_switched'), success: true }), alerts) });
			return history.go(-1);
		}

		await dispatch({ loading: true });
		try {
			const { _id: rid } = room;
			const result = await Livechat.transferChat({ rid, department });
			const { success } = result;
			if (!success) {
				throw t('no_available_agents_to_transfer');
			}

			await dispatch({ department, loading: false });
			await loadConfig();

			await ModalManager.alert({
				text: t('department_switched'),
			});

			history.go(-1);
		} catch (error) {
			console.error(error);
			await dispatch({ alerts: (alerts.push({ id: createToken(), children: t('no_available_agents_to_transfer'), warning: true }), alerts) });
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
