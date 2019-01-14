import { h, cloneElement, Component } from 'preact';
import createContext from 'preact-context';
import styles from './styles';
import { createClassName } from '../helpers';

const getPositioningStyle = (placement, { left, top, right, bottom }) => {
	switch (placement) {
		case 'left':
			return {
				left: `${ left }px`,
				top: `${ (top + bottom) / 2 }px`,
			};

		case 'top':
			return {
				left: `${ (left + right) / 2 }px`,
				top: `${ top }px`,
			};

		case 'right':
			return {
				left: `${ right }px`,
				top: `${ (top + bottom) / 2 }px`,
			};

		case 'bottom':
		default:
			return {
				left: `${ (left + right) / 2 }px`,
				top: `${ bottom }px`,
			};
	}
};

export const Tooltip = ({ children, hidden = false, placement, floating = false, triggerBounds, ...props }) => (
	<div
		className={createClassName(styles, 'tooltip', { hidden, placement, floating })}
		style={floating ? getPositioningStyle(placement, triggerBounds) : {}}
		{...props}
	>
		{children}
	</div>
);

const TooltipContext = createContext();

export class Container extends Component {
	state = {
		tooltip: null,
	}

	showTooltip = (event, content) => {
		const triggerBounds = event.target.getBoundingClientRect();
		this.setState({ tooltip: <Tooltip floating placement="bottom" triggerBounds={triggerBounds}>{content}</Tooltip> });
	}

	hideTooltip = () => {
		this.setState({ tooltip: null });
	}

	render({ children }) {
		return (
			<TooltipContext.Provider value={{ ...this.state, showTooltip: this.showTooltip, hideTooltip: this.hideTooltip }}>
				{children}
				<TooltipContext.Consumer>
					{({ tooltip }) => tooltip}
				</TooltipContext.Consumer>
			</TooltipContext.Provider>
		);
	}
}

Tooltip.Container = Container;

export const Trigger = ({ children, content }) => (
	<TooltipContext.Consumer>
		{({ showTooltip, hideTooltip }) => cloneElement(children[0], {
			onMouseEnter: (event) => showTooltip(event, content),
			onMouseLeave: (event) => hideTooltip(event),
			onFocusCapture: (event) => showTooltip(event, content),
			onBlurCapture: (event) => hideTooltip(event),
		})}
	</TooltipContext.Consumer>
);

Tooltip.Trigger = Trigger;

export const withTooltip = (component) => {
	const TooltipConnection = ({ tooltip, ...props }) => (
		<Tooltip.Trigger content={tooltip}>
			{h(component, props)}
		</Tooltip.Trigger>
	);
	TooltipConnection.displayName = `withTooltip(${ component.displayName })`;

	return TooltipConnection;
};

export default Tooltip;
