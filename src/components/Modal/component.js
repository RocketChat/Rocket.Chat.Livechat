import { h, Component } from 'preact';

import I18n from '../../i18n';
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
	<div className={createClassName(styles, 'modal__message')}>
		{children}
	</div>
);


export const ConfirmationModal = ({
	text,
	confirmButtonText = I18n.t('Yes'),
	cancelButtonText = I18n.t('No'),
	onConfirm,
	onCancel,
	...props
}) => (
	<Modal open animated dismissByOverlay={false} {...props}>
		<Modal.Message>{text}</Modal.Message>
		<ButtonGroup>
			<Button outline secondary onClick={onCancel}>{cancelButtonText}</Button>
			<Button danger onClick={onConfirm}>{confirmButtonText}</Button>
		</ButtonGroup>
	</Modal>
);


export const AlertModal = ({ text, buttonText = I18n.t('OK'), onConfirm, ...props }) => (
	<Modal open animated dismissByOverlay={false} {...props}>
		<Modal.Message>{text}</Modal.Message>
		<ButtonGroup>
			<Button secondary onClick={onConfirm}>{buttonText}</Button>
		</ButtonGroup>
	</Modal>
);


Modal.Message = ModalMessage;
Modal.Confirm = ConfirmationModal;
Modal.Alert = AlertModal;


export default Modal;
