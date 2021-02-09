import { h, Component } from 'preact';

import Screen from '../../components/Screen';
import I18n from '../../i18n';

const defaultTitle = I18n.t('Leave a message');
// const defaultMessage = I18n.t('We are not online right now. Please, leave a message.');

export default class TriggerMessage extends Component {
	state = { }

	render({ title, color, message, loading, departments, ...props }) {
		return (
			<Screen
				color={color}
				title={title || defaultTitle}
				{...props}
				showHeader={false}
			>
				<Screen.Content showHeader={false}>
					<h1>Messages</h1>
				</Screen.Content>
			</Screen>
		);
	}
}
