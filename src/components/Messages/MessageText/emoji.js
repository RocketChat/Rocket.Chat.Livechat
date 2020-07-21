import shortnameToUnicode from '../../Emoji/shortnameToUnicode';

const emojiUnicode = '\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]'; // unicode emoji from https://www.regextester.com/106421

const emojiRanges = [
	emojiUnicode, // unicode emoji from https://www.regextester.com/106421
	':.{1,40}:', // custom emoji
	' |\n', // allow spaces and line breaks
].join('|');

// this func is called for each emoji, input-> emoji shortname, o/p-> emoji icon in html format
const transformEmojisToNormalSize = (emoji) => `<span style="font-size:large">${ emoji }<span>`;

const transformEmojisToLargeSize = (emoji) => `<span style="font-size:x-large">${ emoji }<span>`;

const removeSpaces = (str) => str && str.replace(/\s/g, '');

const removeAllEmoji = (str) => str.replace(new RegExp(emojiRanges, 'g'), '');

const isOnlyEmoji = (str) => {
	str = removeSpaces(str);
	return !removeAllEmoji(str).length;
};

const renderEmojis = (textWithHtml, origPlainText) => {
	const textwithOnlyUnicode = shortnameToUnicode(origPlainText);

	if (isOnlyEmoji(textwithOnlyUnicode)) {
		return textWithHtml.replace(new RegExp(emojiUnicode, 'g'), transformEmojisToLargeSize);
	}

	return textWithHtml.replace(new RegExp(emojiUnicode, 'g'), transformEmojisToNormalSize);
};

export default renderEmojis;
