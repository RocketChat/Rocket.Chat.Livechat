import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
	linkify: true,
	typographer: true,
});


const strong = (md) => {
	const renderStrong = (tokens, idx, opts, _, slf) => {
		const token = tokens[idx];
		if (token.markup === '*') {
			token.tag = 'strong';
		}
		return slf.renderToken(tokens, idx, opts);
	};

	md.renderer.rules.em_open = renderStrong;
	md.renderer.rules.em_close = renderStrong;
};
md.use(strong);

export const parseMessage = ({ msg, t, conversationFinishedMessage }) => {
	const systemMarkdown = (msg) => (`*${ msg }*`);

	switch (t) {
		case 'r':
			return systemMarkdown(I18n.t('Room name changed'));
		case 'au':
			return systemMarkdown(I18n.t('User added by'));
		case 'ru':
			return systemMarkdown(I18n.t('User removed by'));
		case 'ul':
			return systemMarkdown(I18n.t('User left'));
		case 'uj':
			return systemMarkdown(I18n.t('User joined'));
		case 'wm':
			return systemMarkdown(I18n.t('Welcome'));
		 case 'livechat-close':
			return systemMarkdown(conversationFinishedMessage);
		default:
			return md.render(msg);
	}
};

export const parseDate = (ts) => format(ts, isToday(ts) ? 'HH:mm' : 'dddd HH:mm');
