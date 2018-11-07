import { h, Component } from 'preact';

import Leaveamessage from '../routes/leaveamessage';
import SDK from '../api';

export default class wrapped extends Component {
	async onSubmit(data) {
		this.setState({ loading: true });
		const { message } = await SDK.sendOfflineMessage(data);
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
	render({ theme, offlineMessage, ...props }) {
		return (
			<Leaveamessage
				{...props}
				loading={this.state.loading}
				color={theme.color}
				title={I18n.t('Need help?')}
				message={offlineMessage || I18n.t('We are not online right now. Please, leave a message.')}
				onSubmit={this.onSubmit}
				// minimize={action('minimize')}
				// fullScreen={action('fullScreen')}
				// notification={action('notification')}
				emailPlaceholder={I18n.t('insert your e-mail here...')}
				namePlaceholder={I18n.t('insert your name here...')}
				messsagePlaceholder={I18n.t('write your message...')}
			/>
		);
	}
}
