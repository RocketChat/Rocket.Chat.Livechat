import { h, Component } from 'preact';
import styles from './style';
import { asyncForEach, createClassName } from '../helpers';
import {
	TextInput,
	PasswordInput,
	SelectInput,
} from './inputs';


export class Form extends Component {
	handleSubmit = (event) => {
		event.preventDefault();
	}

	render() {
		const { children, ...props } = this.props;

		return (
			<form noValidate onSubmit={this.handleSubmit} className={createClassName(styles, 'form')} {...props}>
				{children}
			</form>
		);
	}
}

export const Item = ({ children, inline, ...args }) => (
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


const builtinValidations = {
	notNull: (value) => {
		if (!value) {
			throw 'Field required';
		}
	},

	email: (value) => {
		const re = /^\S+@\S+\.\S+/;
		if (value && !re.test(String(value).toLowerCase())) {
			throw 'Invalid email';
		}
	},
};

export class InputField extends Component {
	handleChange = (onChange) => (event) => {
		onChange && onChange(event);
		this.validateAndChangeState();
	}

	validateAndChangeState = async() => {
		try {
			await this.validate(true);
			this.setState({ error: false });
		} catch (error) {
			this.setState({ error });
		}
	}

	validate = async(rethrowErrors = false) => {
		const { base: { value } } = this.el;

		const validations = this.props.validations || [];
		if (this.props.required && ![].includes(builtinValidations.notNull)) {
			validations.push(builtinValidations.notNull);
		}

		try {
			await asyncForEach(validations, (validation) => {
				if (typeof validation === 'string') {
					return builtinValidations[validation](value);
				}

				validation(value);
			});

			return true;
		} catch (error) {
			if (rethrowErrors) {
				throw error;
			}

			return false;
		}
	}

	get value() {
		const { base: { value } } = this.el;
		return value;
	}

	state = {
		error: false,
	}

	renderLabel = ({ label, required, error }) => (
		label && <Label error={!!error}>{label}{required && ' *'}</Label>
	)

	renderInput = ({ type, error, ...args }) => h({
		text: TextInput,
		password: PasswordInput,
		select: SelectInput,
	}[type], { error: !!error, ...args });

	renderDescription = ({ description, error }) => (
		(error || description) && <Description error={!!error}>{error || description}</Description>
	)

	render() {
		const { type = 'text', name, onChange, inline, ...args } = this.props;
		const { error } = this.state;

		return (
			<Item inline={inline}>
				{this.renderLabel({ error, ...args })}
				{this.renderInput({
					type,
					name,
					ref: (el) => this.el = el,
					error,
					onChange: this.handleChange(onChange),
					...args,
				})}
				{this.renderDescription({ error, ...args })}
			</Item>
		);
	}
}


export {
	TextInput as Input,
	TextInput,
	PasswordInput,
	SelectInput,
};

Form.Item = Item;
Form.Label = Label;
Form.Description = Description;

Form.TextInput = TextInput;
Form.PasswordInput = PasswordInput;
Form.SelectInput = SelectInput;

export const Validations = {
	nonEmpty: (value) => (!value ? 'Field required' : undefined),

	email: (value) => (!/^\S+@\S+\.\S+/.test(String(value).toLowerCase()) ? 'Invalid email' : null),
};

export default Form;
