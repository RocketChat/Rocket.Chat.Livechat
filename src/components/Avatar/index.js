import { Component } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';
import StatusIndicator from '../StatusIndicator';


export class Avatar extends Component {
	state = {
		errored: false,
	}

	handleError = () => {
		this.setState({ errored: true });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({ errored: false });
		}
	}

	render = ({ small, large, src, description, status, statusBorderColor = '#ffffff', className, ...args }, { errored }) => (
		<div
			aria-label="User picture"
			className={createClassName(styles, 'avatar', { small, large, nobg: src && !errored }, [className])}
			{...args}
		>
			{(src && !errored) && (
				<img
					src={src}
					alt={description}
					className={createClassName(styles, 'avatar__image')}
					onError={this.handleError}
				/>
			)}

			{status && (
				<div className={createClassName(styles, 'avatar__status', { small, large })}>
					<StatusIndicator status={status} small={small} large={large} borderColor={statusBorderColor} />
				</div>
			)}
		</div>
	)
}

export default Avatar;
