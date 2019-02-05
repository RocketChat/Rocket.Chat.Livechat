import { createClassName } from '../helpers';
import styles from './styles';


const handleMouseUp = ({ target }) => target.blur();

export const Button = ({
	children,
	disabled,
	outline,
	nude,
	danger,
	secondary,
	stack,
	small,
	loading,
	className,
	...props
}) => (
	<button
		{...props}
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
		}, [className])}
		onMouseUp={handleMouseUp}
	>
		{children}
	</button>
);


export const Group = ({ children }) => (
	<div className={createClassName(styles, 'group')}>{children}</div>
);


Button.Group = Group;


export default Button;
