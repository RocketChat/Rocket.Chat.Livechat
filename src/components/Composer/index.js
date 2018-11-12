import { h, Component } from 'preact';
import { createClassName } from '../helpers';
import { parse } from './parsing';
import styles from './styles';


const handleActionClick = (onClick) => (event) => {
	event.preventDefault();
	onClick && onClick(event);
};

export const Actions = ({ children, ...args }) => (
	<div className={createClassName(styles, 'composer__actions')} {...args}>{children}</div>
);

export const Action = ({ children, onClick, ...args }) => (
	<button
		onClick={handleActionClick(onClick)}
		className={createClassName(styles, 'composer__action')}
		{...args}
	>{children}</button>
);

export class Composer extends Component {
	bind = (el) => {
		this.el = el;
	}

	get value() {
		return this.el.innerText;
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

	render({ pre, post, placeholder, value, onChange, onSubmit, onUpload, ...args }) {
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
