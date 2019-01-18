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
		Powered by
		<a href="https://rocket.chat" target="_blank" rel="noopener noreferrer" translate="no">
			<Logo title="Rocket.Chat" class={createClassName(styles, 'powered-by__logo')} width="60" />
		</a>
	</h3>
);


const OptionsTrigger = ({ pop }) => (
	<button className={createClassName(styles, 'footer__options')} onClick={pop}>
		Options
	</button>
);


export const Options = ({ onChangeDepartment, onFinishChat, onRemoveUserData }) => (
	<PopoverMenu trigger={OptionsTrigger} overlayed>
		<Group>
			{onChangeDepartment && <Item onClick={onChangeDepartment}>Change department</Item>}
			{onRemoveUserData && <Item onClick={onRemoveUserData}>Forget/Remove my personal data</Item>}
			{onFinishChat && <Item danger onClick={onFinishChat}>Finish this chat</Item>}
		</Group>
	</PopoverMenu>
);

Footer.Content = Content;
Footer.PoweredBy = PoweredBy;
Footer.Options = Options;

export default Footer;
