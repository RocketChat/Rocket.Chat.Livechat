import { Component } from 'preact';
import { createClassName } from '../helpers';
import CloseIcon from '../../icons/close.svg';
import styles from './styles';

export const Alert = ({ children, success, warning, error, color, onDismiss, ...props }) => (
	<div className={createClassName(styles, 'alert', { success, warning, error })} style={color && { backgroundColor: color }} {...props}>
		<div className={createClassName(styles, 'alert__content')}>
			{children}
		</div>
		<button
			onClick={onDismiss}
			className={createClassName(styles, 'alert__close')}
			aria-label={I18n.t('Dismiss this alert')}
		>
			<CloseIcon width={20} />
		</button>
	</div>
);

class AlertContainer extends Component {
	static defaultProps = {
		timeout: 3000,
	}

	handleDismiss = () => this.props.onDismiss && this.props.onDismiss(this.props.id)

	componentDidMount() {
		const { timeout } = this.props;
		if (Number.isFinite(timeout) && timeout > 0) {
			setTimeout(() => this.handleDismiss(), timeout);
		}
	}

	render = ({ children, ...props }) => <Alert {...props} onDismiss={this.handleDismiss}>{children}</Alert>
}

export default AlertContainer;
