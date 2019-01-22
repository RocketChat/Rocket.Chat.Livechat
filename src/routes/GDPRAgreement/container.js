import { Component } from 'preact';
import { route } from 'preact-router';
import { Consumer } from '../../store';
import GDPRAgreement from './component';
import constants from '../../lib/constants';


const { gdpr: { consentText: defaultConsentText } } = constants;

export class GDPRContainer extends Component {

	handleAgree = async() => {
		const { dispatch } = this.props;
		await dispatch({ gdpr: { accepted: true } });
		route('/');
	}

	render = (props) => (
		<GDPRAgreement {...props} onAgree={this.handleAgree} />
	)
}

export const GDPRConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				theme: {
					color,
				} = {},
				messages: {
					dataProcessingConsentText: consentText,
				} = {},
			} = {},
			iframe: {
				theme: {
					color: customColor,
					fontColor: customFontColor,
					iconColor: customIconColor,
				} = {},
			} = {},
			dispatch,
		}) => (
			<GDPRContainer
				ref={ref}
				{...props}
				theme={{
					color: customColor || color,
					fontColor: customFontColor,
					iconColor: customIconColor,
				}}
				title={I18n.t('GDPR')}
				dispatch={dispatch}
				consentText={consentText || defaultConsentText}
			/>
		)}
	</Consumer>
);


export default GDPRConnector;
