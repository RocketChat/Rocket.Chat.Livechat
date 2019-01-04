import { createClassName } from '../helpers';
import styles from './styles';

export const Button = ({ children, disabled, outline, nude, danger, secondary, stack, small, loading, ...args }) => (
	<button
		{...args}
		type={secondary ? 'button' : 'submit'}
		disabled={disabled}
		className={createClassName(styles, 'button', {
			disabled,
			outline,
			nude,
			danger,
			secondary,
			stack,
			small,
			loading,
		})}
	>
		{children}
	</button>
);


export const Group = ({ children }) => <div className={styles.group}>{ children }</div>;


Button.Group = Group;


export default Button;
