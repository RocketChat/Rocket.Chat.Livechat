import { h } from 'preact';
import styles from './styles';

const Header = ({ children, ...args }) => (
	<header {...args} class={styles.header}>
		{children}
	</header>
);


export const Content = ({ children }) => <div class={styles.content}>{children}</div>;
export const Title = ({ children }) => <div class={styles.title}>{children}</div>;
export const SubTitle = ({ children }) => <div class={styles.subTitle}>{children}</div>;
export default Header;
