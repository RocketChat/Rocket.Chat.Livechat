import { h, Component } from 'preact';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import { Form } from '../../components/Form';
import Screen from '../../components/Screen';
import Toggle from '../../components/ToggleSwitch';
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import styles from './styles.scss';

const defaultTitle = I18n.t('Accessible Mode');
const darkModeText = I18n.t('Dark Mode');
const iconAccompanyingText = I18n.t('Icons Accompanying Text');
const dynamicText = I18n.t('Text Size');

export default class AccessibleMode extends Component {
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
		...props
	}) {
		return (
			<Screen
				color={color}
				title={title || defaultTitle}
				className={createClassName(styles, 'accessible-mode')}
				iconsAccompanyingText={iconsAccompanyingTextState}
				dynamicTextState={dynamicTextState}
				{...props}
			>

				<Screen.Content>
					<Form>
						<Toggle title={darkModeText} handleToggleSwitch={setDarkModeState} modeToggled={darkModeState} dynamicText={dynamicTextState} />
						<Toggle title={iconAccompanyingText} handleToggleSwitch={setIconsAccompanyingTextState} modeToggled={iconsAccompanyingTextState} dynamicText={dynamicTextState} />
						<div className={createClassName(styles, 'dynamic-content-row')}>
							<p className={createClassName(styles, 'toggle-switch__title')}>
								<span className={createClassName(styles, `dynamic-text-title-${ dynamicTextState }`)}>{dynamicText}</span>
							</p>
							<div className={createClassName(styles, 'buttons-group')}>
								<button className={createClassName(styles, 'dynamic-font')} onClick={setSmallDynamicTextState}>
									<div className={createClassName(styles, `fourteen-${ dynamicTextState }`)}>
										<p className={createClassName(styles, 'dynamic-font__small-button')}>{I18n.t('Aa')}</p>
									</div>
								</button>
								<button className={createClassName(styles, 'dynamic-font')} onClick={setNormalDynamicTextState}>
									<div className={createClassName(styles, `twenty-${ dynamicTextState }`)}>
										<p className={createClassName(styles, 'dynamic-font__medium-button')}>{I18n.t('Aa')}</p>
									</div>
								</button>
								<button className={createClassName(styles, 'dynamic-font')} onClick={setLargeDynamicTextState}>
									<div className={createClassName(styles, `twentyfour-${ dynamicTextState }`)}>
										<p className={createClassName(styles, 'dynamic-font__large-button')}>{I18n.t('Aa')}</p>
									</div>
								</button>
							</div>
						</div>
						<ButtonGroup>
							<Button submit loading={loading} disabled={loading} stack onClick={this.handleBackClick}>{I18n.t('Back')}</Button>
						</ButtonGroup>
					</Form>
				</Screen.Content>
				<Screen.Footer />
			</Screen>
		);
	}
}
