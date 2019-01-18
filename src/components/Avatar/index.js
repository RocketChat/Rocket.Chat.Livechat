import styles from './styles';
import { createClassName } from '../helpers';
import StatusIndicator from '../StatusIndicator';

const Avatar = ({ small, large, src, description, status, statusBorderColor = '#ffffff', className, ...args }) => (
	<div
		aria-label="User picture"
		className={createClassName(styles, 'avatar', { small, large, nobg: src }, [className])}
		{...args}
	>
		{src && <img alt={description} className={createClassName(styles, 'avatar__image')} src={src} />}
		{status &&
			<div className={createClassName(styles, 'avatar__status', { small, large })}>
				<StatusIndicator status={status} small={small} large={large} borderColor={statusBorderColor} />
			</div>
		}
	</div>
);

export default Avatar;
