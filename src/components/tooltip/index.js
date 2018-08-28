import { h } from 'preact';
import styles from './styles.scss';
import { createClassName } from '../helpers';

const Tooltip = ({ children, arrowhead, ...props }) => (
	<div className={createClassName(styles, 'tooltip', { arrowhead })} {...props}>
		{children}
	</div>
);

export {
	Tooltip,
};
