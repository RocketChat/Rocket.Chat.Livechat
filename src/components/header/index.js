import { h } from 'preact';
import style from './style';

const Header = ({ children, ...args }) => (
	<header {...args} class={style.header}>
		{children}
	</header>
);


export const Content = ({ children }) => <div class={style.content}>{children}</div>;
export const Title = ({ children }) => <div class={style.title}>{children}</div>;
export const SubTitle = ({ children }) => <div class={style.subTitle}>{children}</div>;
export default Header;
