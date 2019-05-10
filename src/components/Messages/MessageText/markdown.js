import MarkdownIt from 'markdown-it';
import { customEmojify } from './customEmoji';

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
});

md.use((md) => {
	const renderStrong = (tokens, idx, opts, _, slf) => {
		const token = tokens[idx];
		if (token.markup === '*') {
			token.tag = 'strong';
		}
		return slf.renderToken(tokens, idx, opts);
	};

	md.renderer.rules.em_open = renderStrong;
	md.renderer.rules.em_close = renderStrong;
});

export const renderMarkdown = (...args) => md.render(customEmojify(...args));
