import { h } from 'preact';
import styles from './styles';
import Logo from './logo.svg';
import { createClassName } from '../helpers';
import { PopoverMenu, Group, Item } from '../Menu';


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
		Powered by <Logo title="Rocket.Chat" class={createClassName(styles, 'powered-by__logo')} width="60" />
	</h3>
);


const OptionsTrigger = ({ pop }) => (
	<button className={createClassName(styles, 'footer__options')} onClick={pop}>
		Options
	</button>
);


export const Options = ({ onChangeDepartment, onFinishChat }) => (
	<PopoverMenu trigger={OptionsTrigger}>
		<Group>
			<Item onClick={onChangeDepartment}>Change department</Item>
			<Item danger onClick={onFinishChat}>Finish this chat</Item>
		</Group>
	</PopoverMenu>
);

Footer.Content = Content;
Footer.PoweredBy = PoweredBy;
Footer.Options = Options;

export default Footer;
