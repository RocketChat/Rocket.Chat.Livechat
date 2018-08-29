import { h } from 'preact';
import style from './style';
import as from '../../i18n';

export const Container = ({ children }) => <div class={style.container}>{children}</div>;

const Footer = ({ children }) => (
	<footer class={style.footer}>
		{children}
	</footer>
);

export const Powered = () => <h3 class={style.powered}>Powered by Rocket.Chat</h3>;
console.log(as, I18n);
export default Footer;
