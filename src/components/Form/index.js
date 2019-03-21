import { createClassName, MemoizedComponent } from '../helpers';
import styles from './styles';


export class Form extends MemoizedComponent {
	static defaultHandleSubmit = (event) => {
		event.preventDefault();
	}

	render = ({ onSubmit, className, style = {}, children }) => (
		<form
			noValidate
			onSubmit={onSubmit || Form.defaultHandleSubmit}
			className={createClassName(styles, 'form', {}, [className])}
			style={style}
		>
			{children}
		</form>
	)
}

export const Validations = {
	nonEmpty: (value) => (!value ? 'Field required' : undefined),

	email: (value) => (!/^\S+@\S+\.\S+/.test(String(value).toLowerCase()) ? 'Invalid email' : null),
};

export { FormField } from './FormField';
export { TextInput } from './TextInput';
export { PasswordInput } from './PasswordInput';
export { SelectInput } from './SelectInput';
