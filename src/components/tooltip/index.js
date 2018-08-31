import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

const Tooltip = ({ children, hidden, placement, ...props }) => (
	<div className={createClassName(styles, 'tooltip', { hidden, placement })} {...props}>
		{children}
	</div>
);

export default Tooltip;
