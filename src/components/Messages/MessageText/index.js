import { h } from 'preact';

import { createClassName, memo } from '../../helpers';
import renderEmojis from './emoji';
import { renderMarkdown } from './markdown';
import styles from './styles.scss';

const sanitizeHtml = require('sanitize-html');

const sanitizeHtmlOptions = {
	allowedTags: ['a'],
	allowedAttributes: {
		a: ['href', 'name', 'target'],
	},
};

export const MessageText = memo(({
	text,
	system,
	className,
	style = {},
}) => (
	<div
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{ __html: renderMarkdown(renderEmojis(sanitizeHtml(text, sanitizeHtmlOptions))) }}
		className={createClassName(styles, 'message-text', { system }, [className])}
		style={style}
	/>
));
