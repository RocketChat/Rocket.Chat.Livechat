import { Component } from 'preact';
import SDK from '../../api';
import { Consumer } from '../../store';
import LeaveMessage from './component';
import ModalManager from '../../components/Modal/manager';

export class LeaveMessageContainer extends Component {
	handleSubmit = async(fields) => {
		const { dispatch, successMessage } = this.props;

		await dispatch({ loading: true });
		try {
			const message = await SDK.sendOfflineMessage(fields);
			ModalManager.alert({
				text: successMessage || message
			});
		} catch (error) {
			const { message } = error.data;
			console.error(message);
		} finally {
			await dispatch({ loading: false });
		}
	}

	render = (props) => (
		<LeaveMessage {...props} onSubmit={this.handleSubmit} />
	)
}


export const LeaveMessageConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				messages: {
					offlineMessage: message,
					offlineSuccessMessage: successMessage,
				} = {},
				theme: {
					offlineTitle: title,
					offlineColor: color,
				} = {},
			} = {},
			loading,
			token,
			dispatch,
		}) => (
			<LeaveMessageContainer
				ref={ref}
				{...props}
				title={title || I18n.t('Leave a message')}
				color={color}
				message={message || I18n.t('We are not online right now. Please, leave a message.')}
				successMessage={successMessage}
				loading={loading}
				token={token}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);


export default LeaveMessageConnector;
