import { createClassName, memo } from '../../helpers';
import { renderMarkdown } from './markdown';
import styles from './styles.scss';
import {Emoji} from 'emoji-mart';

// error handling - incase the emoji name is not valid
const fallbackEmoji = (emoji, props) => {
	return emoji ? `:${emoji.short_names[0]}:` : props.emoji;
}

// this func is called for each emoji, input-> emoji shortname, o/p-> emoji icon in html format
const getEmojiNormalSize = (emojiColonName) => {
	return Emoji({
		html: true,
		set: 'apple',
		emoji: emojiColonName,
		size: 32,
		fallback: fallbackEmoji
	  });
}

const getEmojiLargeSize = (emojiColonName) => {
	return Emoji({
		html: true,
		set: 'apple',
		emoji: emojiColonName,
		size: 54,
		fallback: fallbackEmoji
	  });
}

const renderEmojis = (textWithHtml, origPlainText) => {

	// check if the text only contains emojis
	// this is done by first seperating the emojis from normal text, and then comparing the
	// length of original text with combined length of alll emojis, if they are equal it means
	// only emojis are present in the text
	const allEmojis = origPlainText.match(/\s*:(.*?):\s*/g);

	if(allEmojis!=null){
		let totalEmojisLength = 0;
		for(let i=0;i<allEmojis.length;i++){
			totalEmojisLength += allEmojis[i].length;
		}

		if(totalEmojisLength == origPlainText.length){
			// only emojis are present
			const withEmoji = textWithHtml.replace(/:(.*?):/g, getEmojiLargeSize);
			return withEmoji;
		}else{
			// emojis + normal text
			const withEmoji = textWithHtml.replace(/:(.*?):/g, getEmojiNormalSize);
			return withEmoji;
		}
	}else{
		// only plain text chars present
		return textWithHtml;
	}
}

export const MessageText = memo(({
	text,
	system,
	className,
	style = {},
}) => (
	<div
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{ __html: renderEmojis(renderMarkdown(text), text)}}
		className={createClassName(styles, 'message-text', { system }, [className])}
		style={style}
	/>
));
