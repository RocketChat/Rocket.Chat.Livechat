import { h } from 'preact';
import styles from './styles';

export const Container = ({ children }) => <div class={styles.container}>{children}</div>;

const Footer = ({ children }) => (
	<footer class={styles.footer}>
		{children}
	</footer>
);

export const PoweredBy = () => <h3 class={styles.powered}>Powered by Rocket.Chat</h3>;

export default Footer;
