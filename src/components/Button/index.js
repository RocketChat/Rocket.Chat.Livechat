import { h } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';

const Button = ({ children, disabled, outline, danger, stack, small, loading, ...args }) => (
	<button {...args} disabled={disabled} className={createClassName(styles, 'button', {
		disabled,
		outline,
		danger,
		stack,
		small,
		loading,
	})}
	>
		{children}
	</button>
);

export default Button;

export const Group = ({ children }) => <div className={styles.group}>{ children }</div>;
