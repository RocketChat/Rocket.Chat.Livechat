import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

export const Tooltip = ({ children, hidden = false, placement, ...props }) => (
	<div
		className={createClassName(styles, 'tooltip', { hidden, placement })}
		{...props}
	>
		{children}
	</div>
);

export const Placeholder = ({ children, ...props }) => (
	<div
		className={createClassName(styles, 'tooltip__placeholder')}
		{...props}
	>
		{children}
	</div>
);

export default Tooltip;
