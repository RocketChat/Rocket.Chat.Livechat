import { Component } from 'preact';
import SDK from '../../api';
import { Consumer } from '../../store';
import LeaveMessage from './component';


export class LeaveMessageContainer extends Component {
	async onSubmit(data) {
		const { messages } = this.props;
		this.setState({ loading: true });
		let message;

		try {
			({ message } = await SDK.sendOfflineMessage(data));
			message = (messages && messages.offlineSuccessMessage) || message;
		} catch (error) {
			({ message } = error.data);
		}
		// eslint-disable-next-line no-alert
		window.alert(message);

		this.setState({ loading: false });
	}
	constructor() {
		super();
		this.state = {
			loading: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
	}
	render({ theme, messages, ...props }) {
		return (
			<LeaveMessage
				{...props}
				loading={this.state.loading}
				color={theme.offlineColor}
				title={theme.offlineTitle || I18n.t('Need help?')}
				message={messages.offlineMessage || I18n.t('We are not online right now. Please, leave a message.')}
				onSubmit={this.onSubmit}
				// minimize={action('minimize')}
				// fullScreen={action('fullScreen')}
				// notification={action('notification')}
				namePlaceholder={I18n.t('insert your name here...')}
				emailPlaceholder={I18n.t('insert your e-mail here...')}
				messsagePlaceholder={I18n.t('write your message...')}
			/>
		);
	}
}


export const LeaveMessageConnector = ({ ref, ...props }) => (
	<Consumer>
		{(state) => <LeaveMessageContainer ref={ref} {...props} {...state} />}
	</Consumer>
);


export default LeaveMessageConnector;
