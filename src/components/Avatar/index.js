import { Component } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';
import StatusIndicator from '../StatusIndicator';


export class Avatar extends Component {
	state = {
		loading: true,
	}

	handleLoad = () => {
		this.setState({ loading: false });
	}

	handleError = () => {
		this.setState({ loading: null });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({ loading: true });
		}
	}

	render = ({ small, large, src, description, status, statusBorderColor = '#ffffff', className, ...args }, { loading }) => (
		<div
			aria-label="User picture"
			className={createClassName(styles, 'avatar', { small, large, nobg: (src && loading === false) }, [className])}
			{...args}
		>
			{(src && typeof loading === 'boolean') && (
				<img
					src={src}
					alt={description}
					className={createClassName(styles, 'avatar__image', { loading })}
					onLoad={loading && this.handleLoad}
					onError={loading && this.handleError}
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
