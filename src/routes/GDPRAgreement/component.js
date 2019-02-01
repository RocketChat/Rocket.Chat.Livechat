import { Component } from 'preact';
import Button from '../../components/Button';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';


export default class GDPR extends Component {
	handleClick = () => {
		const { onAgree } = this.props;
		onAgree && onAgree();
	}

	render = ({
		color,
		title,
		consentText,
		// eslint-disable-next-line no-unused-vars
		onAgree,
		...props
	}) => (
		<Screen
			color={color}
			title={title}
			className={createClassName(styles, 'gdpr')}
			{...props}
		>
			<p className={createClassName(styles, 'gdpr__consent-text')}>{consentText}</p>
			<p className={createClassName(styles, 'gdpr__instructions')} translate="no">
				Go to <strong>menu options → Forget/Remove my personal data</strong> to request the immediate removal of your data.
			</p>

			<Button.Group>
				<Button onClick={this.handleClick} stack>{ I18n.t('I Agree') }</Button>
			</Button.Group>
		</Screen>
	)
}
