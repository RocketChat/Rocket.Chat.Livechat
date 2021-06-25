import { h, Component } from 'preact';

import { ModalManager } from '../../components/Modal';
import history from '../../history';
import I18n from '../../i18n';
import { setDarkModeState } from '../../lib/main';
import { Consumer } from '../../store';
import AccessibleMode from './component';

export class AccessibleModeContainer extends Component {

	confirmChange = async () => {
		const result = await ModalManager.confirm({
			text: I18n.t('Are you sure you want to save the changes?'),
		});

		return typeof result.success === 'boolean' && result.success;
	}

	handleBack = (props) => {
		history.go(-1);
	}

	render = (props) => (
		<AccessibleMode {...props} onCancel={this.handleBack} />
	)
}

export const AccessibleModeConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				theme: {
					color,
				} = {},
			} = {},
			iframe: {
				theme: {
					color: customColor,
					fontColor: customFontColor,
					iconColor: customIconColor,
				} = {},
			} = {},
			accessible: {
				iconsAccompanyingText: iconsAccompanyingTextState,
				darkMode: darkModeState,
				dynamicText: dynamicTextState,
			} = {},
			room,
			loading = false,
			dispatch,
			alerts,
			token,
			setIconsAccompanyingTextState={setIconsAccompanyingTextState},
			setDarkModeState={setDarkModeState},
		}) => (
			<AccessibleModeContainer
				ref={ref}
				{...props}
				theme={{
					color: customColor || color,
					fontColor: customFontColor,
					iconColor: customIconColor,
				}}
				dynamicTextState={dynamicTextState}
				darkModeState={darkModeState}
				iconsAccompanyingTextState={iconsAccompanyingTextState}
				loading={loading}
				dispatch={dispatch}
				room={room}
				alerts={alerts}
				token={token}
			/>
		)}
	</Consumer>
);


export default AccessibleModeConnector;
