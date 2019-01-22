import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';


export const Header = ({ children, color, className, post, large, ...props }) => (
	<header className={createClassName(styles, 'header', { large }, [className])} style={{ backgroundColor: color }} {...props}>
		{children}
		{post}
	</header>
);

export const Picture = ({ children, className, ...props }) => (
	<div className={createClassName(styles, 'header__picture', {}, [className])} {...props}>
		{children}
	</div>
);

export const Content = ({ children, className, ...props }) => (
	<div className={createClassName(styles, 'header__content', {}, [className])} {...props}>
		{children}
	</div>
);

export const Title = ({ children, className, ...props }) => (
	<div className={createClassName(styles, 'header__title', {}, [className])} {...props}>
		{children}
	</div>
);

export const SubTitle = ({ children, className, ...props }) => (
	<div
		className={createClassName(styles, 'header__subtitle', {
			children: children.length > 0,
		}, [className])}
		{...props}
	>
		{children}
	</div>
);

export const Actions = ({ children, className, ...props }) => (
	<nav className={createClassName(styles, 'header__actions', {}, [className])} {...props}>
		{children}
	</nav>
);

export const Action = ({ children, className, ...props }) => (
	<button className={createClassName(styles, 'header__action', {}, [className])} {...props}>
		{children}
	</button>
);

export const Post = ({ children, className, ...props }) => (
	<div className={createClassName(styles, 'header__post', {}, [className])} {...props}>
		{children}
	</div>
);

export const CustomField = ({ children, className, ...props }) => (
	<div
		className={createClassName(styles, 'header__custom-field', {}, [className])}
		{...props}
	>
		{children}
	</div>
);

Header.Picture = Picture;
Header.Content = Content;
Header.Title = Title;
Header.SubTitle = SubTitle;
Header.Actions = Actions;
Header.Action = Action;
Header.Post = Post;
Header.CustomField = CustomField;

export default Header;
