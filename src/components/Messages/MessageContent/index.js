import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const MessageContent = memo(({ className, style = {}, children }) => (
	<div
		className={createClassName(styles, 'message-content', {}, [className])}
		style={style}
	>
		{children}
	</div>
));
