import { h, Component } from 'preact';
// import { route } from 'preact-router';

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
		{() => (
			<TriggerMessageContainer
				ref={ref}
				{...props}
			/>
		)}
	</Consumer>
);

export default TriggerMessageConnector;
