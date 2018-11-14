import { h, Component } from 'preact';

import Leaveamessage from '../routes/leaveamessage';
import SDK from '../api';

export default class wrapped extends Component {
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
		alert(message);

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
			<Leaveamessage
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
