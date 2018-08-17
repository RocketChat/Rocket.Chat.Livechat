import { h } from 'preact';
import style from './style';

const Header = ({ children }) => (
	<footer class={style.footer}>
		<h1>{children}</h1>
	</footer>
);

export default Header;
