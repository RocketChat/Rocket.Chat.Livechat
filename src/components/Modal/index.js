import { Component } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';


export class Modal extends Component {
	handleKeyDown = ({ key }) => {
		if (key === 'Escape') {
			this.triggerDismiss();
		}
	}

	handleTouchStart = () => {
		this.triggerDismiss();
	}

	handleMouseDown = () => {
		this.triggerDismiss();
	}

	triggerDismiss = () => {
		const { onDismiss } = this.props;
		onDismiss && onDismiss();
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown, false);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown, false);
	}

	render = ({ children, animated, open, ...props }) => (
		open ? (
			<div
				onTouchStart={this.handleTouchStart}
				onMouseDown={this.handleMouseDown}
				className={createClassName(styles, 'modal__overlay')}
			>
				<div className={createClassName(styles, 'modal', { animated })} {...props}>{children}</div>
			</div>
		) : null
	)
}

export default Modal;
