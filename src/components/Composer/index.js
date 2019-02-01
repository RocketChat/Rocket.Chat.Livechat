import { Component } from 'preact';
import { createClassName } from '../helpers';
import { parse } from './parsing';
import styles from './styles';


const handleActionClick = (onClick) => (event) => {
	event.preventDefault();
	onClick && onClick(event);
};

export const Actions = ({ children, ...props }) => (
	<div className={createClassName(styles, 'composer__actions')} {...props}>{children}</div>
);

export const Action = ({ children, text, onClick, ...props }) => (
	<button
		{...props}
		className={createClassName(styles, 'composer__action')}
		aria-label={text}
		onClick={handleActionClick(onClick)}
	>{children}</button>
);

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
	bind = (el) => {
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

	handlePaste = (onUpload) => async(event) => {
		if (!event.clipboardData || !event.clipboardData.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.clipboardData.items);

		const files = items.filter((item) => (item.kind === 'file' && /^image\//.test(item.type)))
			.map((item) => item.getAsFile());
		if (files.length) {
			onUpload && onUpload(files);
			return;
		}

		const texts = await Promise.all(
			items.filter((item) => (item.kind === 'string' && /^text\/plain/.test(item.type)))
				.map((item) => new Promise((resolve) => item.getAsString(resolve)))
		);
		texts.forEach((text) => this.pasteText(text));
	}

	handleDrop = (onUpload) => async(event) => {
		if (!event.dataTransfer || !event.dataTransfer.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.dataTransfer.items);

		const files = items.filter((item) => (item.kind === 'file' && /^image\//.test(item.type)))
			.map((item) => item.getAsFile());
		if (files.length) {
			onUpload && onUpload(files);
			return;
		}

		const texts = await Promise.all(
			items.filter((item) => (item.kind === 'string' && /^text\/plain/.test(item.type)))
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

	// we only update composer if connecting prop changed or if value length changed from 0 to 1 or 1 to 0
	// everything else is managed by this.el
	shouldComponentUpdate({ connecting: nextConnecting, value: nextValue }) {
		const { connecting, value } = this.props;

		if (nextConnecting !== connecting) {
			return true;
		}

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
		  el.innerHTML = this.value = this.props.value;
		}
		replaceCaret(el);
	}

	render({ pre, post, placeholder, value, connecting, onChange, onSubmit, onUpload, ...args }) {
		if (connecting) {
			return (
				<div className={createClassName(styles, 'composer')} {...args}>
					<div data-placeholder={I18n.t('Connecting to an agent...')}
						className={createClassName(styles, 'composer__input', { connecting })}
					/>
				</div>
			);
		}
		return (
			<div className={createClassName(styles, 'composer')} {...args}>
				{pre}
				<div
					ref={this.bind}
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: parse(value) }}
					data-placeholder={placeholder}
					onInput={this.handleInput(onChange)}
					onKeypress={this.handleKeypress(onSubmit)}
					onPaste={this.handlePaste(onUpload)}
					onDrop={this.handleDrop(onUpload)}
					className={createClassName(styles, 'composer__input')}
					contentEditable
				/>
				{post}
			</div>
		);
	 }
}

export default Composer;
