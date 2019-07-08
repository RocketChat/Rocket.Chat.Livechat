import { h, cloneElement, Component } from 'preact';
import createContext from 'preact-context';

import styles from './styles.scss';
import { createClassName } from '../helpers';


const getPositioningStyle = (placement, { left, top, right, bottom }) => {
	switch (placement) {
		case 'left':
			return {
				left: `${ left }px`,
				top: `${ (top + bottom) / 2 }px`,
			};

		case 'top':
		case 'top-left':
		case 'top-right':
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
		case 'bottom-left':
		case 'bottom-right':
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


export class TooltipContainer extends Component {
	state = {
		tooltip: null,
	}

	showTooltip = (event, { content, placement = 'bottom' }) => {
		const triggerBounds = event.target.getBoundingClientRect();
		this.setState({ tooltip: <Tooltip floating placement={placement} triggerBounds={triggerBounds}>{content}</Tooltip> });
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


export const TooltipTrigger = ({ children, content, placement }) => (
	<TooltipContext.Consumer>
		{({ showTooltip, hideTooltip }) => cloneElement(children[0], {
			onMouseEnter: (event) => showTooltip(event, { content, placement }),
			onMouseLeave: (event) => hideTooltip(event),
			onFocusCapture: (event) => showTooltip(event, { content, placement }),
			onBlurCapture: (event) => hideTooltip(event),
		})}
	</TooltipContext.Consumer>
);


export const withTooltip = (component) => {
	const TooltipConnection = ({ tooltip, ...props }) => (
		<Tooltip.Trigger content={tooltip}>
			{h(component, props)}
		</Tooltip.Trigger>
	);
	TooltipConnection.displayName = `withTooltip(${ component.displayName })`;

	return TooltipConnection;
};


Tooltip.Container = TooltipContainer;
Tooltip.Trigger = TooltipTrigger;


export default Tooltip;
