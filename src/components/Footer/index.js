import { h } from 'preact';
import styles from './styles';
import Logo from './logo.svg';
import { createClassName } from '../helpers';


export const Footer = ({ children, ...props }) => (
	<footer className={createClassName(styles, 'footer')} {...props}>
		{children}
	</footer>
);

export const Content = ({ children, ...props }) => (
	<div className={createClassName(styles, 'footer__content')} {...props}>
		{children}
	</div>
);

export const PoweredBy = (props) => (
	<h3 className={createClassName(styles, 'powered-by')} {...props}>
		Powered by
		<a href="https://rocket.chat" target="_blank" rel="noopener noreferrer" translate="no">
			<Logo title="Rocket.Chat" class={createClassName(styles, 'powered-by__logo')} width="60" />
		</a>
	</h3>
);

export const Options = (props) => (
	<button className={createClassName(styles, 'footer__options')} {...props}>
		Options
	</button>
);

Footer.Content = Content;
Footer.PoweredBy = PoweredBy;
Footer.Options = Options;

export { Footer as Main };

export default Footer;
