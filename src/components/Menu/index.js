import { h } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';

export const Menu = ({ children, hidden, ...props }) => (
	<div className={createClassName(styles, 'menu', { hidden })} {...props}>
		{children}
	</div>
);

export const Group = ({ children, title, ...props }) => (
	<div className={createClassName(styles, 'menu__group')} {...props}>
		{title && <div className={createClassName(styles, 'menu__group-title')}>{title}</div>}
		{children}
	</div>
);

export const Item = ({ children, primary, danger, disabled, ...props }) => (
	<button
		className={createClassName(styles, 'menu__item', { primary, danger, disabled })}
		disabled={disabled} {...props}>{children}</button>
);

export default Menu;
