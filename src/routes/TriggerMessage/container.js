import { h, Component } from 'preact';
// import { route } from 'preact-router';

import { canRenderMessage } from '../../components/helpers';
import { Consumer } from '../../store';
import TriggerMessage from './component';


export class TriggerMessageContainer extends Component {
	handleClick() {
		console.log('click');
	}

	render = (props) => (
		<TriggerMessage {...props} />
	)
}

export const TriggerMessageConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			messages,
		}) => (
			<TriggerMessageContainer
				ref={ref}
				{...props}
				messages={messages && messages.filter((message) => canRenderMessage(message))}
			/>
		)}
	</Consumer>
);

export default TriggerMessageConnector;
