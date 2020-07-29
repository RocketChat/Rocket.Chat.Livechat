import MarkdownIt from 'markdown-it';
import { h, Component } from 'preact';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import styles from './styles.scss';


const md = new MarkdownIt({
	linkify: false,
	typographer: false,
});

const defaultConsentText = I18n.t(
	'The controller of your personal data is [Company Name], with registered '
	+ 'office at [Company Address]. To start the chat you agree that your '
	+ 'personal data shall be processed and trasmitted in accordance with the General Data Protection Regulation (GDPR).',
);

const defaultInstructions = I18n.t(
	'Go to **menu options → Forget/Remove my personal data** to request the immediate removal of your data.',
);

export default class GDPR extends Component {
	handleClick = () => {
		const { onAgree } = this.props;
		onAgree && onAgree();
	}

	render = ({
		color,
		title,
		consentText,
		instructions,
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
			<Screen.Content>
				<p
					className={createClassName(styles, 'gdpr__consent-text')}
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: md.renderInline(consentText || defaultConsentText) }}
				/>
				<p
					className={createClassName(styles, 'gdpr__instructions')}
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: md.renderInline(instructions || defaultInstructions) }}
				/>

				<ButtonGroup>
					<Button onClick={this.handleClick} stack>{ I18n.t('I Agree') }</Button>
				</ButtonGroup>
			</Screen.Content>
			<Screen.Footer />
		</Screen>
	)
}
