import { Component } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';
import Button from '../Button';


export class Modal extends Component {
	static defaultProps = {
		dismissByOverlay: true,
	}

	handleKeyDown = ({ key }) => {
		if (key === 'Escape') {
			this.triggerDismiss();
		}
	}

	handleTouchStart = () => {
		const { dismissByOverlay } = this.props;
		dismissByOverlay && this.triggerDismiss();
	}

	handleMouseDown = () => {
		const { dismissByOverlay } = this.props;
		dismissByOverlay && this.triggerDismiss();
	}

	triggerDismiss = () => {
		const { onDismiss } = this.props;
		this.mounted && onDismiss && onDismiss();
	}

	componentDidMount() {
		this.mounted = true;
		window.addEventListener('keydown', this.handleKeyDown, false);
		const { timeout } = this.props;
		if (Number.isFinite(timeout) && timeout > 0) {
			setTimeout(() => this.triggerDismiss(), timeout);
		}
	}

	componentWillUnmount() {
		this.mounted = false;
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


export const ModalMessage = ({ children }) => (
	<div className={createClassName(styles, 'modal__message')}>
		{children}
	</div>
);


export const ConfirmationModal = ({
	text,
	confirmButtonText = 'Yes',
	cancelButtonText = 'No',
	onConfirm,
	onCancel,
	...props
}) => (
	<Modal open animated dismissByOverlay={false} {...props}>
		<Modal.Message>{text}</Modal.Message>
		<Button.Group>
			<Button outline secondary onClick={onCancel}>{cancelButtonText}</Button>
			<Button danger onClick={onConfirm}>{confirmButtonText}</Button>
		</Button.Group>
	</Modal>
);


export const AlertModal = ({ text, buttonText = 'Ok', onConfirm, ...props }) => (
	<Modal open animated dismissByOverlay={false} {...props}>
		<Modal.Message>{text}</Modal.Message>
		<Button.Group>
			<Button secondary onClick={onConfirm}>{buttonText}</Button>
		</Button.Group>
	</Modal>
);


Modal.Message = ModalMessage;
Modal.Confirm = ConfirmationModal;
Modal.Alert = AlertModal;


export default Modal;
