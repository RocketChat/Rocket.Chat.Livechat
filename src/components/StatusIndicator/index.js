import { h } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';

export const StatusIndicator = ({ status, ...props }) => (
	<span className={createClassName(styles, 'status', { status })} {...props} />
);

export const statuses = [
	'offline',
	'online',
	'away',
	'busy',
];

export default StatusIndicator;
