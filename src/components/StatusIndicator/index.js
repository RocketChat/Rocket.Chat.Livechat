import { createClassName } from '../helpers';
import styles from './styles';

export const StatusIndicator = ({ status, small, large, bordered, ...props }) => (
	<span className={createClassName(styles, 'status', { status, small, large, bordered })} {...props} />
);

export const statuses = [
	'offline',
	'online',
	'away',
	'busy',
];

export default StatusIndicator;
