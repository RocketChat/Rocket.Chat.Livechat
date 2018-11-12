const escapeMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	'\'': '&#x27;',
	'`': '&#x60;',
};
const escapeRegex = new RegExp(`(?:${ Object.keys(escapeMap).join('|') })`, 'g');

export const escapeHtml = (string) => string.replace(escapeRegex, (match) => escapeMap[match]);

export const parse = (plainText) => [{ plain: plainText }]
	.map(({ plain, html }) => (plain ? escapeHtml(plain) : (html || '')))
	.join('');
