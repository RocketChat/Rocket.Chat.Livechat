import { h, Component } from 'preact';
import styles from './style';
import { createClassName } from '../helpers';


export class Form extends Component {
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

export const FormItem = ({ children, inline, ...args }) => (
	<div className={createClassName(styles, 'form__item', { inline })} {...args}>
		{children}
	</div>
);

export const Label = ({ children, error, ...args }) => (
	<label className={createClassName(styles, 'form__label', { error })} {...args}>
		{children}
	</label>
);

export const Description = ({ children, error, ...args }) => (
	<small className={createClassName(styles, 'form__description', { error })} {...args}>
		{children}
	</small>
);

export const Error = (props) => <Description error {...props} />;

export const Validations = {
	nonEmpty: (value) => (!value ? 'Field required' : undefined),

	email: (value) => (!/^\S+@\S+\.\S+/.test(String(value).toLowerCase()) ? 'Invalid email' : null),
};

export { FileUploadInput } from './inputs';

export { TextInput } from './TextInput';
export { PasswordInput } from './PasswordInput';
export { SelectInput } from './SelectInput';
