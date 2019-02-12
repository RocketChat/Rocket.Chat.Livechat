import { createClassName } from '../helpers';
import styles from './styles';
import ChatIcon from '../../icons/chat.svg';
import CloseIcon from '../../icons/close.svg';

const handleMouseUp = ({ target }) => target.blur();

export const ChatButton = ({
	text,
	open = false,
	badge,
	className,
	style = {},
	theme: { color: backgroundColor, iconColor: color } = {},
	...props
}) => (
	<button
		{...props}
		type="button"
		className={createClassName(styles, 'chat-button', { open }, [className])}
		style={(style || backgroundColor || color) ? { ...(style || {}), backgroundColor, color } : null}
		aria-label={text}
		onMouseUp={handleMouseUp}
	>
		{badge && <span className={createClassName(styles, 'chat-button__badge')}>{badge}</span>}
		{open ? <CloseIcon /> : <ChatIcon />}
	</button>
);


export default ChatButton;
