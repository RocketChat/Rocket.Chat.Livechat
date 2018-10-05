
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
export default md;
