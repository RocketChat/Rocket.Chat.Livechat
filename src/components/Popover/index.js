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

	handleKeyDown = ({ key }) => {
		if (key === 'Escape') {
			this.dismiss();
		}
	}

	open = (renderer, props, { currentTarget } = {}) => {
		let overlayBounds;
		let triggerBounds;

		if (this.overlayRef) {
			overlayBounds = normalizeDOMRect(this.overlayRef.base.getBoundingClientRect());
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

	componentDidMount() {
		this.mounted = true;
		window.addEventListener('keydown', this.handleKeyDown, false);
	}

	componentWillUnmount() {
		this.mounted = false;
		window.removeEventListener('keydown', this.handleKeyDown, false);
	}

	render = ({ children }, { renderer, overlayProps, overlayBounds, triggerBounds }) => (
		<PopoverContext.Provider value={{ open: this.open }}>
			<div className={createClassName(styles, 'popover__container')}>
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
			</div>
		</PopoverContext.Provider>
	)
}


export const PopoverTrigger = ({ children, ...props }) => (
	<PopoverContext.Consumer>
		{({ open }) => children[0]({ pop: open.bind(null, children[1], props) })}
	</PopoverContext.Consumer>
);
