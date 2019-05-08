import { createClassName, memo } from '../../helpers';
import { renderMarkdown } from './markdown';
import { emojify } from 'react-emojione';
import styles from './styles';


export const MessageText = memo(({
	text,
	system,
	className,
	style = {},
}) => (
	<div
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{ __html: emojify(renderMarkdown(text), { output: 'unicode' }) }}
		className={createClassName(styles, 'message-text', { system }, [className])}
		style={style}
	/>
));
