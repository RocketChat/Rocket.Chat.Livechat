import { Component } from 'preact';
import { route } from 'preact-router';
import { Consumer } from '../../store';
import ChatFinished from './component';


export class ChatFinishedContainer extends Component {
	handleRedirect = () => {
		route('/');
	}

	render = (props) => (
		<ChatFinished {...props} onRedirectChat={this.handleRedirect} />
	)
}


export const ChatFinishedConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				messages: {
					conversationFinishedMessage: greeting,
				} = {},
				theme: {
					color,
				} = {},
			} = {},
		}) => (
			<ChatFinishedContainer
				ref={ref}
				{...props}
				title={I18n.t('Chat Finished')}
				color={color}
				greeting={greeting || I18n.t('Thanks for talking with us')}
				message={I18n.t('If you have any other question, just press the button below to start a new chat.')}
			/>
		)}
	</Consumer>
);


export default ChatFinishedConnector;
