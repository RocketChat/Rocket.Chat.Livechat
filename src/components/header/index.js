import { h } from 'preact';
import styles from './styles';

const Header = ({ children, ...args }) => (
	<header {...args} class={styles.header}>
		{children}
	</header>
);

export const Avatar = ({ children }) => <div class={styles.avatar}>{children}</div>;
export const Actions = ({ children }) => <nav class={styles.actions}>{children}</nav>;
export const Action = (({ children, ...args }) => (<button {...args} class={styles.action}>{children}</button>));
export const Content = ({ children }) => <div class={styles.content}>{children}</div>;
export const Title = ({ children }) => <div class={styles.title}>{children}</div>;
export const SubTitle = ({ children }) => <div class={styles.subTitle}>{children}</div>;
Header.Avatar = Avatar;
Header.Actions = Actions;
Header.Action = Action;
Header.Content = Content;
Header.Title = Title;
Header.SubTitle = Actions;
export default Header;
