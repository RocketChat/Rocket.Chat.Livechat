import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

console.log(styles);

const Tooltip = ({ children, arrowhead, ...props }) => (
	<div className={createClassName(styles, 'tooltip', { arrowhead })} {...props}>
		{children}
	</div>
);

export {
	Tooltip,
};
