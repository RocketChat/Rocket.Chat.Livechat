import { createClassName, memo } from '../../helpers';
import { renderMarkdown } from './markdown';
import styles from './styles';


export const MessageText = memo(({
	text,
	quote,
	system,
	className,
	style = {},
}) => (
	<div
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
		className={createClassName(styles, 'message-text', { quote, system }, [className])}
		style={style}
	/>
));
