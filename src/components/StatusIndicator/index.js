import { h } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';

export const StatusIndicator = ({ status, small, large, borderColor, ...props }) => (
	<span className={createClassName(styles, 'status', { status, small, large, border: borderColor })} style={{ borderColor }} {...props} />
);

export const statuses = [
	'offline',
	'online',
	'away',
	'busy',
];

export default StatusIndicator;
