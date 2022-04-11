/* eslint-disable no-use-before-define */
import { h, Component } from 'preact';

import history from '../../history';
import { Consumer } from '../../store';
import AccessibleMode from './component';

export class AccessibleModeContainer extends Component {
	handleBack = () => {
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
			setIconsAccompanyingTextState = { setIconsAccompanyingTextState },
			setDarkModeState = { setDarkModeState },
			setSmallDynamicTextState = { setSmallDynamicTextState },
			setNormalDynamicTextState = { setNormalDynamicTextState },
			setLargeDynamicTextState = { setLargeDynamicTextState },
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
