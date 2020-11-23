import { h, Component } from 'preact';

import I18n from '../../i18n';
import CloseIcon from '../../icons/close.svg';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export class Alert extends Component {
	static defaultProps = {
		timeout: 3000,
		hideCloseButton: false,
	}

	handleDismiss = () => {
		const { onDismiss, id } = this.props;
		onDismiss && onDismiss(id);
	}

	componentDidMount() {
		const { timeout } = this.props;
		if (Number.isFinite(timeout) && timeout > 0) {
			this.dismissTimeout = setTimeout(this.handleDismiss, timeout);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.dismissTimeout);
	}

	render = ({ success, warning, error, color, hideCloseButton, className, style = {}, children }) => (
		<div
			role='alert'
			className={createClassName(styles, 'alert', { success, warning, error }, [className])}
			style={{
				...style,
				...color && { backgroundColor: color },
			}}
		>
			<div className={createClassName(styles, 'alert__content')}>
				{children}
			</div>
			{!hideCloseButton && (
				<button
					onClick={this.handleDismiss}
					className={createClassName(styles, 'alert__close')}
					aria-label={I18n.t('Dismiss this alert')}
				>
					<CloseIcon width={20} height={20} />
				</button>
			)}
		</div>
	)
}
