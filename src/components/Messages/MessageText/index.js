import * as joypixels from 'emoji-toolkit';

import { createClassName, memo } from '../../helpers';
import { renderMarkdown } from './markdown';
import styles from './styles.scss';

const renderEmojis = (textWithHtml, origPlainText) => {
	// replace unicode to shortnames
	origPlainText = joypixels.toShort(origPlainText);
	textWithHtml = joypixels.toShort(textWithHtml);

	// check if the text only contains emojis
	// this is done by first separating the emojis from normal text, and then comparing the
	// length of original text with combined length of all emojis, if they are equal it means
	// only emojis are present in the text
	const allEmojis = origPlainText.match(/\s*:(.*?):\s*/g);
	if (allEmojis != null) {
		let totalEmojisLength = 0;
		for (let i = 0; i < allEmojis.length; i++) {
			totalEmojisLength += allEmojis[i].length;
		}

		if (totalEmojisLength === origPlainText.length) {
			// only emojis are present
			joypixels.emojiSize = 64;
			return `${ joypixels.shortnameToImage(textWithHtml) }`;
		}
		// emojis + normal text
		joypixels.emojiSize = 32;
		return `${ joypixels.shortnameToImage(textWithHtml) }`;
	}
	// only plain text chars present
	return textWithHtml;
};

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
