import { Component } from 'preact';
// import SDK from '../../api';
import { Consumer } from '../../store';
import SurveyFeedback from './component';
// import { insert, createToken } from '../../components/helpers';
import { Livechat } from '../../api';
import { endChat } from '../../lib/room';
import { createToken } from '../../components/helpers';

export class SurveyFeedbackContainer extends Component {
	handleSubmit = async(fields) => {

		const { survey } = this.props;

		const { alerts, dispatch, room: { _id: rid } } = this.props;

		await dispatch({ loading: true });

		try{
			if (rid){
				const data = survey.items.map(ratingFactorName => {
					return {
						name: ratingFactorName,
						value: `${fields.rating}`
					}
				});
				const packet = {
					rid: rid,
					data: data
				}
				Livechat.chatSurvey(packet).then(response => {
					console.log('SDK response - survey --> ', response);
				}).catch(error => {
					console.error('error -->', error);
				});
			}
		}catch(error){
			console.error(error);
			const alert = { id: createToken(), children: I18n.t('Error Saving Feedback'), error: true, timeout: 0 };
			await dispatch({ alerts: (alerts.push(alert), alerts) });
		}finally {
			await dispatch({ loading: false });
			await endChat();
		}
	}

	onCancelClick = async() => {
		// don't record feedback - end the chat
		await endChat();
	}

	render = (props) => (
		<SurveyFeedback {...props} onSubmit={this.handleSubmit} onCancelClick={this.onCancelClick} />
	)
}


export const SurveyFeedbackConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				theme: {
					color,
				} = {},
				survey: survey,
			} = {},
			iframe: {
				theme: {
					color: customColor,
				} = {},
			} = {},
			loading,
			token,
			dispatch,
			room,
			alerts,
		}) => (
			<SurveyFeedbackContainer
				ref={ref}
				{...props}
				theme={{
					color: customColor || color,
				}}
				title={I18n.t('Feedback')}
				message={I18n.t('How would you rate your experience?')}
				loading={loading}
				token={token}
				dispatch={dispatch}
				room={room}
				alerts={alerts}
				survey={survey}
			/>
		)}
	</Consumer>
);


export default SurveyFeedbackConnector;
