import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

export const Header = ({ children, color, ...props }) => (
	<header className={createClassName(styles, 'header')} style={{ backgroundColor: color }} {...props}>
		{children}
	</header>
);

export const Picture = ({ children, ...props }) => (
	<div className={createClassName(styles, 'header__picture')} {...props}>
		{children}
	</div>
);

export const Content = ({ children, ...props }) => (
	<div className={createClassName(styles, 'header__content')} {...props}>
		{children}
	</div>
);

export const Title = ({ children, ...props }) => (
	<div className={createClassName(styles, 'header__title')} {...props}>
		{children}
	</div>
);

export const SubTitle = ({ children, ...props }) => (
	<div className={createClassName(styles, 'header__subtitle')} {...props}>
		{children}
	</div>
);

export const Actions = ({ children, ...props }) => (
	<nav className={createClassName(styles, 'header__actions')} {...props}>
		{children}
	</nav>
);

export const Action = ({ children, ...props }) => (
	<button className={createClassName(styles, 'header__action')} {...props}>
		{children}
	</button>
);

export default Header;
