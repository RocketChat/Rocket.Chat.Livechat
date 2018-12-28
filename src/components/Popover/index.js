import { Component } from 'preact';
import { createContext } from 'preact-context';
import { createClassName, normalizeDOMRect } from '../helpers';
import styles from './styles';


const PopoverContext = createContext();


const PopoverOverlay = ({ children, className, visible, ...props }) => (
	<div
		className={createClassName(styles, 'popover__overlay', { visible }, [className])}
		{...props}
	>
		{children}
	</div>
);


export class PopoverContainer extends Component {
	state = {
		renderer: null,
	}

	open = (renderer, props, { currentTarget } = {}) => {
		let overlayBounds;
		let triggerBounds;

		if (this.overlayRef) {
			overlayBounds = normalizeDOMRect(this.overlayRef.getDOMNode().getBoundingClientRect());
		}

		if (currentTarget) {
			triggerBounds = normalizeDOMRect(currentTarget.getBoundingClientRect());
		}

		this.setState({ renderer, ...props, overlayBounds, triggerBounds });
	}

	dismiss = () => {
		this.setState({ renderer: null, overlayBounds: null, triggerBounds: null });
	}

	handleDismiss = ({ currentTarget, target }) => {
		if (currentTarget !== target) {
			return;
		}

		this.dismiss();
	}

	handleOverlayRef = (ref) => {
		this.overlayRef = ref;
	}

	render = ({ children }, { renderer, overlayProps, overlayBounds, triggerBounds }) => (
		<PopoverContext.Provider
			value={{ open: this.open }}
		>
			{children}
			<PopoverOverlay
				ref={this.handleOverlayRef}
				onMouseDown={this.handleDismiss}
				onTouchStart={this.handleDismiss}
				visible={!!renderer}
				{...overlayProps}
			>
				{renderer ? renderer({ dismiss: this.dismiss, overlayBounds, triggerBounds }) : null}
			</PopoverOverlay>
		</PopoverContext.Provider>
	)
}


export const PopoverTrigger = ({ children, ...props }) => (
	<PopoverContext.Consumer>
		{({ open }) => children[0]({ pop: open.bind(null, children[1], props) })}
	</PopoverContext.Consumer>
);
