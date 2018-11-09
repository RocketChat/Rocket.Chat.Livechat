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

	handleKeypress = (onSubmit) => (event) => {
		const { which, shiftKey } = event;

		if (which === 13 && !shiftKey) {
			onSubmit && onSubmit(this.el.innerText);
			this.el.innerText = '';
			event.preventDefault();
		}
	}

	handlePaste = (onUpload) => (event) => {
		if (event.clipboardData == null || !event.clipboardData.items) {
			return;
		}

		event.preventDefault();

		const items = Array.from(event.clipboardData.items);
		const files = items
			.filter((item) => (item.kind === 'file' && item.type.indexOf('image/') !== -1))
			.map((item) => item.getAsFile());

		onUpload(files);
	}

	handleInput = () => {}

	render({ pre, post, placeholder, value, onSubmit, onUpload, ...args }) {
		return (
			<div className={createClassName(styles, 'composer', {})} {...args}>
				{pre}
				<div
					ref={this.bind}
					data-placeholder={placeholder}
					onKeypress={this.handleKeypress(onSubmit)}
					onPaste={this.handlePaste(onUpload)}
					onInput={this.handleInput}
					className={createClassName(styles, 'composer__input', {})}
					contentEditable
				>{value}</div>
				{post}
			</div>
		);
	 }
}

export default Composer;
