import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const TextInput = memo(({
	name,
	value,
	placeholder,
	disabled,
	small,
	multiline = false,
	rows = 1,
	error,
	onChange,
	onInput,
	className,
	style = {},
}) => (
	multiline ?
		(
			<textarea
				rows={rows}
				name={name}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={onChange}
				onInput={onInput}
				className={createClassName(styles, 'text-input', { disabled, error, small, multiline }, [className])}
				style={style}
			/>
		) :
		(
			<input
				type="text"
				name={name}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={onChange}
				onInput={onInput}
				className={createClassName(styles, 'text-input', { disabled, error, small }, [className])}
				style={style}
			/>
		)
));
