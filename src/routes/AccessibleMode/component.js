import { h, Component } from 'preact';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import Screen from '../../components/Screen';
import Toggle from '../../components/ToggleSwitch';
import { Form, FormField, SelectInput, Validations } from '../../components/Form';
import {setDarkModeState} from '../../lib/main'
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import styles from './styles.scss';

const defaultTitle = I18n.t('Accessible Mode');
const darkModeText = I18n.t('Dark Mode');
const iconAccompanyingText = I18n.t('Icons Accompanying Text');
const dynamicText = I18n.t('Text Size');
const textSize = I18n.t('textSize');

const optionsArray =[{_id: 1, name:"small"}, {_id:2, name: "normal"}, {_id:2, name: "large"}]

export default class AccessibleMode extends Component {

	handleBackClick = () => {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}

	constructor(props) {
		super(props);
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
		...props 
	}) {
		return (
			<Screen
				color={color}
				title={title || defaultTitle}
				className={createClassName(styles, 'accessible-mode')}
				iconsAccompanyingText={iconsAccompanyingTextState}
				{...props}
			>
				
				<Screen.Content>
					<Form>
					<Toggle title={darkModeText} handleToggleSwitch={setDarkModeState} modeToggled={darkModeState}/>		
					<Toggle title={iconAccompanyingText} handleToggleSwitch={setIconsAccompanyingTextState} modeToggled={iconsAccompanyingTextState}/>
					<p className={createClassName(styles, 'toggle-switch__title')}>{dynamicText}</p>	
					<FormField>
						<SelectInput
							name={textSize}
							value={this.state.dynamicText}
							options={optionsArray.map(({ _id, name }) => ({ value: _id, label: name }))}
							placeholder={I18n.t('Choose a Font Size...')}
							disabled={loading}
						/>
					</FormField>

					<ButtonGroup>
						<Button submit loading={loading} disabled={loading} stack onClick={this.handleBackClick}>{I18n.t('Back')}</Button>
					</ButtonGroup>
					</Form>
				</Screen.Content>  
			
			</Screen>
		);
	}
}