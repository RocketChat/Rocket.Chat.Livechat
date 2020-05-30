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

		const { alerts, dispatch, room: { _id: rid } } = this.props;

		await dispatch({ loading: true });

		try{
			if (rid){
				const packet = {
					rid: rid,
					data: [{
						name: 'satisfaction',	// TODO: modify ILivechatSurveyAPI in RC.js.SDK to remove this field
						value: `${fields.rating}`
					}]
				}
				// console.log('Packet --> ', packet);
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

	render = (props) => (
		<SurveyFeedback {...props} onSubmit={this.handleSubmit} />
	)
}


export const SurveyFeedbackConnector = ({ ref, ...props }) => (
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
			/>
		)}
	</Consumer>
);


export default SurveyFeedbackConnector;
