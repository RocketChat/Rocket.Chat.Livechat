import MarkdownIt from 'markdown-it';
import { emojify } from 'react-emojione';

const md = new MarkdownIt({
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

export const renderMarkdown = (...args) => emojify(md.render(...args), { output: 'unicode' });
