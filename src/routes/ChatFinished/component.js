import { h, Component } from 'preact';
import { withTranslation } from 'react-i18next';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles.scss';

class ChatFinished extends Component {
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
		t,
		...props
	}) => {
		const defaultGreeting = t('thanks_for_talking_with_us');
		const defaultMessage = t('if_you_have_any_other_questions_just_press_the_but');

		return <Screen
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
					<Button onClick={this.handleClick} stack>{ t('new_chat') }</Button>
				</ButtonGroup>
			</Screen.Content>
			<Screen.Footer />
		</Screen>;
	}
}

export default withTranslation()(ChatFinished);
