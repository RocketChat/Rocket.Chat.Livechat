import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const PasswordInput = memo(({
	name,
	value,
	placeholder,
	disabled,
	small,
	error,
	onChange,
	onInput,
	className,
	style = {},
}) => (
	<input
		type="password"
		name={name}
		value={value}
		placeholder={placeholder}
		disabled={disabled}
		onChange={onChange}
		onInput={onInput}
		className={createClassName(styles, 'form__input-password', { disabled, error, small }, [className])}
		style={style}
	/>
));
