import { createClassName } from '../helpers';
import styles from './styles';
import ChatIcon from '../../icons/chat.svg';
import CloseIcon from '../../icons/close.svg';


export const ChatButton = ({ open = false, badge, ...props }) => (
	<button {...props} type="button" className={createClassName(styles, 'chat-button', { open })}>
		{badge && <span className={createClassName(styles, 'chat-button__badge')}>{badge}</span>}
		{open ? <CloseIcon /> : <ChatIcon />}
	</button>
);


export default ChatButton;
