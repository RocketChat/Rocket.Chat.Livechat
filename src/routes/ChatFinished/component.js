import { h, Component } from 'preact';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import styles from './styles.scss';

const defaultGreeting = I18n.t('Thanks for talking with us');
const defaultMessage = I18n.t('If you have any other questions, just press the button below to start a new chat.');

export default class ChatFinished extends Component {
	handleClick = () => {
		const { onRedirectChat } = this.props;
		onRedirectChat && onRedirectChat();
	}

	render = ({
		color,
		title,
		greeting,
		message,
		// eslint-disable-next-line no-unused-vars
		onRedirectChat,
		iconsAccompanyingTextState,
		dynamicTextState,
		darkModeState,
		...props
	}) => (
		<Screen
			color={color}
			title={title}
			className={createClassName(styles, 'chat-finished')}
			iconsAccompanyingText={iconsAccompanyingTextState}
			dynamicTextState={dynamicTextState}
			{...props}
		>
			<Screen.Content>
				<p className={createClassName(styles, 'chat-finished__greeting')}>
					<span className={createClassName(styles, `chat-finished__greeting__text-size-${ dynamicTextState }`)}>{greeting || defaultGreeting}</span>
				</p>
				<p className={createClassName(styles, 'chat-finished__message')}>
					<span className={createClassName(styles, `chat-finished__message__text-size-${ dynamicTextState }`)}>{message || defaultMessage}</span>
				</p>

				<ButtonGroup>
					<Button onClick={this.handleClick} stack>{ I18n.t('New Chat') }</Button>
				</ButtonGroup>
			</Screen.Content>
			<Screen.Footer />
		</Screen>
	)
}
