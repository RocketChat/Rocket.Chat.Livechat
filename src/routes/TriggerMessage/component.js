import { h, Component } from 'preact';

import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import styles from './styles.scss';


const defaultTitle = I18n.t('Leave a message');

export default class TriggerMessage extends Component {
	state = { }

	render({ title, color, messages, loading, departments, ...props }) {
		console.log(messages);
		return (
			<Screen
				color={color}
				title={title || defaultTitle}
				{...props}
				showHeader={false}
				showTopCloseButton={true}
			>
				<Screen.Content showHeader={false}>
					{messages && messages.map((message) => <p className={createClassName(styles, 'trigger-message__message')}>{message?.msg}</p>)}
				</Screen.Content>
				<footer className={createClassName(styles, 'trigger-message__footer')}>
					<hr className={createClassName(styles, 'trigger-message__separator')} />
					<a className={createClassName(styles, 'trigger-message__link-reply')} href='#'>{I18n.t('Start a chat')}</a>
				</footer>
			</Screen>
		);
	}
}
