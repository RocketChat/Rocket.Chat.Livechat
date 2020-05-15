import { createClassName, memo } from '../../helpers';
import { renderMarkdown } from './markdown';
import styles from './styles.scss';
import {Emoji} from 'emoji-mart';

// error handling - incase the emoji name is not valid
const fallbackEmoji = (emoji, props) => {
	return emoji ? `:${emoji.short_names[0]}:` : props.emoji;
}

// this func is called for each emoji, input-> emoji shortname, o/p-> emoji icon in html format
const getEmoji = (emojiColonName) => {
	return Emoji({
		html: true,
		set: 'apple',
		emoji: emojiColonName,
		size: 32,
		fallback: fallbackEmoji
	  });
}

const renderEmojis = (txt) => {
	const withEmoji = txt.replace(/:(.*?):/g, getEmoji);
	return withEmoji;
}

export const MessageText = memo(({
	text,
	system,
	className,
	style = {},
}) => (
	<div
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{ __html: renderEmojis(renderMarkdown(text))}}
		className={createClassName(styles, 'message-text', { system }, [className])}
		style={style}
	/>
));
