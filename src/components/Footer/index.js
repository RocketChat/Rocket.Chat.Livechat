import { h } from 'preact';
import styles from './styles';
import Logo from './logo.svg';
import { createClassName } from '../helpers';

export const Footer = ({ children, ...props }) => (
	<footer class={createClassName(styles, 'footer')} {...props}>
		{children}
	</footer>
);

export const Container = ({ children, ...props }) => (
	<div class={createClassName(styles, 'footer__container')} {...props}>
		{children}
	</div>
);

export const PoweredBy = (props) => (
	<h3 class={createClassName(styles, 'powered-by')} {...props}>
		Powered by <Logo title="Rocket.Chat" class={createClassName(styles, 'powered-by__logo')} width="60" />
	</h3>
);

export { Logo };

export default Footer;
