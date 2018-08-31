import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

const Tooltip = ({ children, hidden, tail, ...props }) => (
	<div className={createClassName(styles, 'tooltip', { hidden, tail })} {...props}>
		{children}
	</div>
);

export default Tooltip;
