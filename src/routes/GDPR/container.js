import { Component } from 'preact';
import SDK from '../../api';
import { route } from 'preact-router';
import { loadConfig } from '../../lib/main';
import { Consumer } from '../../store';
import GDPR from './component';


export class GDPRContainer extends Component {

	handleClick = async(fields) => {
		const { dispatch, gdpr } = this.props;

        await dispatch({ loading: true, gdpr: { accepted: true } });
		await dispatch({ loading: false });
	}

	render = (props) => (
		<GDPR {...props} onClick={this.handleClick} />
	)
}

export const GDPRConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				departments = {},
				theme: {
					color,
                } = {},
                messages: {
                    dataProcessingConsentText: consentText
                } = {},
			} = {},
            loading = false,
            dispatch,
		}) => (
			<GDPRContainer
				ref={ref}
				{...props}
				title={I18n.t('GDPR')}
				color={color}
                loading={loading}
                dispatch={dispatch}
                consentText={consentText || 'The controller of your personal data is Rocket.Chat Technologies Corp., with registered office at 2711 Centerville Road, Suite 400, Wilmington, Delaware, USA. To start the chat you agree that your personal data shall be processed and trasmitted in accordance with the General Data Protection Regulation (GDPR).'}
                instructions={I18n.t('Go to menu options → forget/remove my data to request the immediate removal of your data.')}
			/>
		)}
	</Consumer>
);


export default GDPRConnector;
