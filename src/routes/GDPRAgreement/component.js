import MarkdownIt from 'markdown-it';
import { h, Component } from 'preact';
import { Trans, withTranslation } from 'react-i18next';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles.scss';

const md = new MarkdownIt({
	linkify: false,
	typographer: false,
});

class GDPR extends Component {
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
		iconsAccompanyingTextState,
		dynamicTextState,
		darkModeState,
		t,
		...props
	}) => (
		<Screen
			color={color}
			title={title}
			className={createClassName(styles, 'gdpr')}
			iconsAccompanyingText={iconsAccompanyingTextState}
			{...props}
		>
			<Screen.Content>
				<p className={createClassName(styles, 'gdpr__consent-text')}>
					{
						consentText
							? <p
								className={createClassName(styles, `gdpr__consent-text__font-${ dynamicTextState }`)}
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{ __html: md.renderInline(consentText) }}
							/>
							: <p className={createClassName(styles, `gdpr__consent-text__font-${ dynamicTextState }`)}>
								<Trans i18nKey='the_controller_of_your_personal_data_is_company_na' />
							</p>
					}
				</p>
				<p className={createClassName(styles, 'gdpr__instructions')}>
					{
						instructions
							? <p
								className={createClassName(styles, `gdpr__instructions__text-font-${ dynamicTextState }`)}
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{ __html: md.renderInline(instructions) }}
							/>
							: <p className={createClassName(styles, `gdpr__instructions__text-font-${ dynamicTextState }`)}>
								<Trans i18nKey='go_to_menu_options_forget_remove_my_personal_data'>
								Go to <strong>menu options → Forget/Remove my personal data</strong> to request the immediate removal of your data.
								</Trans>
							</p>
					}
				</p>
				<ButtonGroup>
					<Button onClick={this.handleClick} stack>{ t('i_agree') }</Button>
				</ButtonGroup>
			</Screen.Content>
			<Screen.Footer />
		</Screen>
	)
}

export default withTranslation()(GDPR);
