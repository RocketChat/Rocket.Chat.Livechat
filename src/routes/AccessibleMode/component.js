import { h, Component } from 'preact';
import { withTranslation } from 'react-i18next';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import { Form } from '../../components/Form';
import Screen from '../../components/Screen';
import Toggle from '../../components/ToggleSwitch';
import { createClassName } from '../../components/helpers';
import styles from './styles.scss';

class AccessibleMode extends Component {
	handleBackClick = () => {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}

	render({
		title,
		color,
		loading,
		dynamicTextState,
		darkModeState,
		iconsAccompanyingTextState,
		setIconsAccompanyingTextState,
		setDarkModeState,
		setSmallDynamicTextState,
		setNormalDynamicTextState,
		setLargeDynamicTextState,
		t,
		...props
	}) {
		return (
			<Screen
				color={color}
				title={title || t('accessible_mode')}
				className={createClassName(styles, 'accessible-mode')}
				iconsAccompanyingText={iconsAccompanyingTextState}
				dynamicTextState={dynamicTextState}
				{...props}
			>

				<Screen.Content>
					<Form>
						<Toggle title={t('dark_mode')} handleToggleSwitch={setDarkModeState} modeToggled={darkModeState} dynamicText={dynamicTextState} />
						<Toggle title={t('icons_accompanying_text')} handleToggleSwitch={setIconsAccompanyingTextState} modeToggled={iconsAccompanyingTextState} dynamicText={dynamicTextState} />

						<div className={createClassName(styles, 'dynamic-content-row')}>
							<p className={createClassName(styles, 'dynamic-content-row__title')}>
								<span className={createClassName(styles, `dynamic-text-title-${ dynamicTextState }`)}>
									{t('text_size')}
								</span>
							</p>
							<div className={createClassName(styles, 'buttons-group')}>
								<button className={createClassName(styles, 'dynamic-font')} onClick={setSmallDynamicTextState}>
									<div className={createClassName(styles, `font-16px-${ dynamicTextState }`)}>
										<p className={createClassName(styles, 'dynamic-font__small-button')}>
											{t('aa')}
										</p>
									</div>
								</button>
								<button className={createClassName(styles, 'dynamic-font')} onClick={setNormalDynamicTextState}>
									<div className={createClassName(styles, `font-20px-${ dynamicTextState }`)}>
										<p className={createClassName(styles, 'dynamic-font__medium-button')}>
											{t('aa')}
										</p>
									</div>
								</button>
								<button className={createClassName(styles, 'dynamic-font')} onClick={setLargeDynamicTextState}>
									<div className={createClassName(styles, `font-24px-${ dynamicTextState }`)}>
										<p className={createClassName(styles, 'dynamic-font__large-button')}>
											{t('aa')}
										</p>
									</div>
								</button>
							</div>
						</div>
						<ButtonGroup>
							<Button submit loading={loading} disabled={loading} stack onClick={this.handleBackClick}>
								{t('back')}
							</Button>
						</ButtonGroup>
					</Form>
				</Screen.Content>
				<Screen.Footer />
			</Screen>
		);
	}
}

export default withTranslation()(AccessibleMode);
