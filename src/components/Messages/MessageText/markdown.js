import MarkdownIt from 'markdown-it';


const md = new MarkdownIt({
	linkify: true,
	typographer: true,
});

const defaultRender = md.renderer.rules.link_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	const targetAttrIndex = tokens[idx].attrIndex('target');
	const relAttrIndex = tokens[idx].attrIndex('rel');

	if (targetAttrIndex < 0) {
		tokens[idx].attrPush(['target', '_blank']);
	} else {
		tokens[idx].attrs[targetAttrIndex][1] = '_blank';
	}

	if (relAttrIndex < 0) {
		tokens[idx].attrPush(['rel', 'noopener noreferrer']);
	} else {
		tokens[idx].attrs[relAttrIndex][1] = 'noopener noreferrer';
	}

	return defaultRender(tokens, idx, options, env, self);
};

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

export const renderMarkdown = (...args) => md.render(...args);
