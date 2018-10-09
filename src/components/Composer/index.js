import { h, Component } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';


export const Action = ({ children, onClick, ...args }) =>
	(
		<button
			onClick={(e) => {
				e.preventDefault();
				return onClick && onClick(e);
			}}
			{...args}
			class={styles.action}
		>{children}</button>
	);

export const Actions = ({ children }) => <div class={styles.actions}>{children}</div>;

export default class Composer extends Component {
	bind(el) {
		this.el = el;
	}
	get value() {
		return this.el.innerText;
	}
	onKeypress(event) {
		const { which, shiftKey } = event;
		if (which === 13 && !shiftKey) {
			this.props.onSubmit && this.props.onSubmit(this.el.innerText);
			this.el.innerText = '';
			event.preventDefault();
		}
	}
	input(event) {
		// const { inputType, data } = event;
		// if (inputType === 'insertParagraph' || (inputType === 'insertText' && data === null)) {
		// 	this.props.onSubmit && this.props.onSubmit(this.el.innerText);
		// 	this.el.innerText = '';
		// }
	}
	constructor() {
		super();
		this.bind = this.bind.bind(this);
		this.input = this.input.bind(this);
		this.onKeypress = this.onKeypress.bind(this);
	}
	 render({ pre, post, placeholder, ...args }) {
		 return (
			<div {...args} className={createClassName(styles, 'composer', {})}>
				{pre}
				<div ref={this.bind} onKeypress={this.onKeypress} onInput={this.input} placeholder={placeholder} className={createClassName(styles, 'composer__input', {})} contenteditable />
				{post}
			</div>);
	 }
}
