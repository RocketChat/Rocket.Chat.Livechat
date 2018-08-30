import { h } from 'preact';
import style from './style';

export const Container = ({ children }) => <div class={style.container}>{children}</div>;

const Footer = ({ children }) => (
	<footer class={style.footer}>
		{children}
	</footer>
);

export const Powered = () => <h3 class={style.powered}>Powered by Rocket.Chat</h3>;
export default Footer;
