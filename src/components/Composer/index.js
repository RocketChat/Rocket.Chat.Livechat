import mem from 'mem';
import { Component } from 'preact';

import { createClassName } from '../helpers';
import styles from './styles.scss';


const escapeMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	'\'': '&#x27;',
	'`': '&#x60;',
};

const escapeRegex = new RegExp(`(?:${ Object.keys(escapeMap).join('|') })`, 'g');

const escapeHtml = mem(
	(string) => string.replace(escapeRegex, (match) => escapeMap[match])
);

const parse = (plainText) =>
	[{ plain: plainText }]
		.map(({ plain, html }) => (plain ? escapeHtml(plain) : html || ''))
		.join('');
const findLastTextNode = (node) => {
	if (node.nodeType === Node.TEXT_NODE) {
		return node;
	}
	const children = node.childNodes;
	for (let i = children.length - 1; i >= 0; i--) {
		const textNode = findLastTextNode(children[i]);
		if (textNode !== null) {
			return textNode;
		}
	}
	return null;
};

const replaceCaret = (el) => {
	// Place the caret at the end of the element
	const target = findLastTextNode(el);
	// do not move caret if element was not focused
	const isTargetFocused = document.activeElement === el;
	if (target !== null && target.nodeValue !== null && isTargetFocused) {
		const range = document.createRange();
		const sel = window.getSelection();
		range.setStart(target, target.nodeValue.length);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		if (el instanceof HTMLElement) {
			el.focus();
		}
	}
};

export class Composer extends Component {
	handleRef = (el) => {
		this.el = el;
	}

	handleInput = (onChange) => () => {
		onChange && onChange(this.el.innerText);
	}

	handleKeypress = (onSubmit) => (event) => {
		if (event.which === 13 && !event.shiftKey) {
			event.preventDefault();
			onSubmit && onSubmit(this.el.innerText);
			this.el.innerText = '';
		}
	}

	handlePaste = (onUpload) => async (event) => {
		if (!event.clipboardData || !event.clipboardData.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.clipboardData.items);

		const files = items.filter((item) => item.kind === 'file' && /^image\//.test(item.type))
			.map((item) => item.getAsFile());
		if (files.length) {
			onUpload && onUpload(files);
			return;
		}

		const texts = await Promise.all(
			items.filter((item) => item.kind === 'string' && /^text\/plain/.test(item.type))
				.map((item) => new Promise((resolve) => item.getAsString(resolve)))
		);
		texts.forEach((text) => this.pasteText(text));
	}

	handleDrop = (onUpload) => async (event) => {
		if (!event.dataTransfer || !event.dataTransfer.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.dataTransfer.items);

		const files = items.filter((item) => item.kind === 'file' && /^image\//.test(item.type))
			.map((item) => item.getAsFile());
		if (files.length) {
			onUpload && onUpload(files);
			return;
		}

		const texts = await Promise.all(
			items.filter((item) => item.kind === 'string' && /^text\/plain/.test(item.type))
				.map((item) => new Promise((resolve) => item.getAsString(resolve)))
		);
		texts.forEach((text) => this.pasteText(text));
	}

	pasteText = (plainText) => {
		this.el.focus();

		if (document.queryCommandSupported('insertText')) {
			document.execCommand('insertText', false, plainText);
			return;
		}

		const range = document.getSelection().getRangeAt(0);
		range.deleteContents();
		const textNode = document.createTextNode(plainText);
		range.insertNode(textNode);
		range.selectNodeContents(textNode);
		range.collapse(false);

		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}

	constructor(props) {
		super(props);
		this.value = this.props.value;
	}

	// we only update composer if value length changed from 0 to 1 or 1 to 0
	// everything else is managed by this.el
	shouldComponentUpdate({ value: nextValue }) {
		const { value } = this.props;

		const nextValueEmpty = !nextValue || nextValue.length === 0;
		const valueEmpty = !value || value.length === 0;

		if (nextValueEmpty !== valueEmpty) {
			return true;
		}

		return false;
	}

	componentDidUpdate() {
		const { el } = this;
		if (!el) {
			return;
		}

		if (this.props.value !== el.innerHTML) {
			this.value = this.props.value;
			el.innerHTML = this.value;
		}
		replaceCaret(el);
	}

	render = ({ pre, post, value, placeholder, onChange, onSubmit, onUpload, className, style }) => (
		<div className={createClassName(styles, 'composer', { }, [className])} style={style}>
			{pre}
			<div
				ref={this.handleRef}
				{...(
					{
						dangerouslySetInnerHTML: {
							__html: parse(value),
						},
						contentEditable: true,
						'data-placeholder': placeholder,
						onInput: this.handleInput(onChange),
						onKeypress: this.handleKeypress(onSubmit),
						onPaste: this.handlePaste(onUpload),
						onDrop: this.handleDrop(onUpload),
					}
				)}
				className={createClassName(styles, 'composer__input')}
			/>
			{post}
		</div>
	)
}

export { ComposerAction } from './ComposerAction';
export { ComposerActions } from './ComposerActions';
