import { Component } from 'preact';
// import SDK from '../../api';
import { Consumer } from '../../store';
import SurveyFeedback from './component';
// import { insert, createToken } from '../../components/helpers';

export class SurveyFeedbackContainer extends Component {
	handleSubmit = async(fields) => {
		console.log(fields);
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
			loading,
			token,
			dispatch,
		}) => (
			<SurveyFeedbackContainer
				ref={ref}
				{...props}
				title={I18n.t('Feedback')}
				color={color}
				message={I18n.t('How would you rate your experience?')}
				loading={loading}
				token={token}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);


export default SurveyFeedbackConnector;
