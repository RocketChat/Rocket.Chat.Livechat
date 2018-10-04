import { h, Component } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

export const Tooltip = ({ children, hidden = false, placement, ...props }) => (
	<div
		className={createClassName(styles, 'tooltip', { hidden, placement })}
		{...props}
	>
		{children}
	</div>
);

export class TooltipConnector extends Component {
	state = {
		hidden: true,
	}

	showTooltip = () => {
		this.setState({ hidden: false });
	}

	hideTooltip = () => {
		this.setState({ hidden: true });
	}

	render() {
		const { children, placement, text, hidden, ...props } = this.props;

		return (
			<div
				className={createClassName(styles, 'tooltip__wrapper')}
				onMouseEnter={this.showTooltip}
				onMouseLeave={this.hideTooltip}
				onFocusCapture={this.showTooltip}
				onBlurCapture={this.hideTooltip}
				{...props}
			>
				{children}
				{text ?
					<Tooltip
						hidden={hidden !== undefined ? hidden : this.state.hidden}
						placement={placement || 'bottom'}
					>
						{text}
					</Tooltip> :
					null}
			</div>
		);
	}
}

export const withTooltip = (component) => {
	const TooltipConnection = ({ tooltip, ...props }) => (
		<TooltipConnector text={tooltip}>
			{h(component, props)}
		</TooltipConnector>
	);
	TooltipConnection.displayName = `withTooltip(${ component.displayName })`;

	return TooltipConnection;
};

export default Tooltip;
