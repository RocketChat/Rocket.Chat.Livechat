import { h, Component } from 'preact';
import { createClassName } from '../helpers';
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

	handlePaste = (onUpload) => (event) => {
		if (!event.clipboardData || !event.clipboardData.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.clipboardData.items);
		const files = items
			.filter((item) => (item.kind === 'file' && item.type.indexOf('image/') !== -1))
			.map((item) => item.getAsFile());

		onUpload && onUpload(files);
	}

	parse = (value) => value

	render({ pre, post, placeholder, value, onChange, onSubmit, onUpload, ...args }) {
		return (
			<div className={createClassName(styles, 'composer', {})} {...args}>
				{pre}
				<div
					ref={this.bind}
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: this.parse(value) }}
					data-placeholder={placeholder}
					onInput={this.handleInput(onChange)}
					onKeypress={this.handleKeypress(onSubmit)}
					onPaste={this.handlePaste(onUpload)}
					className={createClassName(styles, 'composer__input', {})}
					contentEditable
				/>
				{post}
			</div>
		);
	 }
}

export default Composer;
