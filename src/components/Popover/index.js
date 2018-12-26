import { Component } from 'preact';
import { createContext } from 'preact-context';
import { createClassName, normalizeDOMRect } from '../helpers';
import styles from './styles';


const PopoverContext = createContext();


export class PopoverContainer extends Component {
	state = {
		renderer: null,
	}

	open = (renderer, { currentTarget } = {}) => {
		let overlayBounds;
		let triggerBounds;

		if (this.overlayRef) {
			overlayBounds = normalizeDOMRect(this.overlayRef.getBoundingClientRect());
		}

		if (currentTarget) {
			triggerBounds = normalizeDOMRect(currentTarget.getBoundingClientRect());
		}

		this.setState({ renderer, overlayBounds, triggerBounds });
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

	render = ({ children }, { renderer, overlayBounds, triggerBounds }) => (
		<PopoverContext.Provider
			value={{ open: this.open }}
		>
			{children}
			<div
				ref={this.handleOverlayRef}
				className={createClassName(styles, 'popover__overlay', { visible: !!renderer })}
				onMouseDown={this.handleDismiss}
				onTouchStart={this.handleDismiss}
			>
				{renderer ? renderer({ dismiss: this.dismiss, overlayBounds, triggerBounds }) : null}
			</div>
		</PopoverContext.Provider>
	)
}


export const PopoverTrigger = ({ children }) => (
	<PopoverContext.Consumer>
		{({ open }) => children[0]({ pop: open.bind(null, children[1]) })}
	</PopoverContext.Consumer>
);
