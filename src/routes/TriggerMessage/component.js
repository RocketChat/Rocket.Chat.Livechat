import { h, Component } from 'preact';

import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import styles from './styles.scss';


const defaultTitle = I18n.t('Messages');

export default class TriggerMessage extends Component {
	state = { }

	render({ title, messages, loading, onStartChat = () => {}, departments, iconsAccompanyingTextState, dynamicTextState, ...props }) {
		const { theme: { color } } = props;
		return (
			<Screen
				title={title || defaultTitle}
				{...props}
				triggered={true}
				iconsAccompanyingText={iconsAccompanyingTextState}
			>
				<Screen.Content triggered={true}>
					{messages && messages.map((message) => message.msg && <p className={createClassName(styles, 'trigger-message__message')}>{message.msg}</p>)}
				</Screen.Content>
				<footer className={createClassName(styles, 'trigger-message__footer')}>
					<hr className={createClassName(styles, 'trigger-message__separator')} />
					<button style={color && { color }} onClick={onStartChat} className={createClassName(styles, 'trigger-message__link-reply')}>{I18n.t('Start chat')}</button>
				</footer>
			</Screen>
		);
	}
}
