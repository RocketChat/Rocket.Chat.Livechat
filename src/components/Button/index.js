import { createClassName, memo } from '../helpers';
import styles from './styles';


const handleMouseUp = ({ target }) => target.blur();

export const Button = memo(({
	submit,
	disabled,
	outline,
	nude,
	danger,
	secondary,
	stack,
	small,
	loading,
	onClick,
	className,
	children,
}) => (
	<button
		type={submit ? 'submit' : 'button'}
		disabled={disabled}
		onClick={onClick}
		onMouseUp={handleMouseUp}
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
	>
		{children}
	</button>
));
