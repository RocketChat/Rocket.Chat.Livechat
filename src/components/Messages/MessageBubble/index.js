import { createClassName, memo } from '../../helpers';
import styles from './styles.scss';


export const MessageBubble = memo(({
	inverse,
	nude,
	quoted,
	className,
	style = {},
	children,
}) => (
	<div
		className={createClassName(styles, 'message-bubble', { inverse, nude, quoted }, [className])}
		style={style}
	>
		<div className={createClassName(styles, 'message-bubble__inner')}>
			{children}
		</div>
	</div>
));
