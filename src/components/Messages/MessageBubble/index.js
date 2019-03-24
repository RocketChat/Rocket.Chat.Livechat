import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const MessageBubble = memo(({
	inverse,
	className,
	style = {},
	children,
}) => (
	<div
		className={createClassName(styles, 'message-bubble', { inverse }, [className])}
		style={style}
	>
		{children}
	</div>
));
