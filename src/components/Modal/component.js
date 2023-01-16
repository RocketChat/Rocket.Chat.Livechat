import { h, Component } from 'preact';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import { addFocusFirstElement, handleTabKey } from '../../lib/keyNavigation';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { createClassName } from '../helpers';
import styles from './styles.scss';


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
	<div className={createClassName(styles, 'modal__message')} id='rocket-chat:modal__message__id'>
		{children}
	</div>
);


export class ConfirmationModal extends Component {
	handleRef = (ref) => {
		this.confirmationModalRef = ref;
	}

	handleCancel = () => {
		const { focusRef, onCancel } = this.props;
		if (focusRef) {
			focusRef.focus();
		}
		onCancel();
	}

	handleKeyDown = (event) => {
		const { key } = event;

		switch (key) {
			case 'Tab':
				handleTabKey(event, this.confirmationModalRef.base);
				break;
			case 'Escape':
				this.handleCancel();
				break;
			default:
				break;
		}

		event.stopPropagation();
	}

	componentDidMount() {
		addFocusFirstElement(this.confirmationModalRef.base);
	}

	render = ({
		text,
		confirmButtonText,
		cancelButtonText,
		onConfirm,
		onCancel,
		t,
		...props
	}) => (
		<Modal open animated dismissByOverlay={false} onkeydown={this.handleKeyDown} ref={this.handleRef} role='dialog' aria-describedby='rocket-chat:modal__message__id' {...props}>
			<Modal.Message>{text}</Modal.Message>
			<ButtonGroup>
				<Button outline secondary onClick={this.handleCancel}>{cancelButtonText || i18next.t('no')}</Button>
				<Button danger onClick={onConfirm}>{confirmButtonText || i18next.t('yes')}</Button>
			</ButtonGroup>
		</Modal>
	)
}

export const AlertModal = withTranslation()(({ text, buttonText, onConfirm, t, ...props }) => (
	<Modal open animated dismissByOverlay={false} {...props}>
		<Modal.Message>{text}</Modal.Message>
		<ButtonGroup>
			<Button secondary onClick={onConfirm}>{buttonText || t('ok')}</Button>
		</ButtonGroup>
	</Modal>
));


Modal.Message = ModalMessage;
Modal.Confirm = ConfirmationModal;
Modal.Alert = AlertModal;


export default Modal;
