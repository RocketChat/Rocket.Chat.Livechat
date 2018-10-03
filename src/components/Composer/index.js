import { h } from 'preact';
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

const Composer = ({ pre, post, placeholder, ...args }) => (
	<div {...args} className={createClassName(styles, 'composer', {})}>
		{pre}
		<div placeholder={placeholder} className={createClassName(styles, 'composer__input', {})} contenteditable />
		{post}
	</div>);

export default Composer;
