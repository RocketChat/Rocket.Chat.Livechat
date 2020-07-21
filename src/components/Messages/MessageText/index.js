import { createClassName, memo } from '../../helpers';
import { renderMarkdown } from './markdown';
import styles from './styles.scss';
import renderEmojis from './emoji';

export const MessageText = memo(({
	text,
	system,
	className,
	style = {},
}) => (
	<div
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{ __html: renderEmojis(renderMarkdown(text), text) }}
		className={createClassName(styles, 'message-text', { system }, [className])}
		style={style}
	/>
));
