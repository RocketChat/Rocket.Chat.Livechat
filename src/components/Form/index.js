import { h, Component } from 'preact';
import Arrow from '../../icons/arrow.svg';
import styles from './style';
import { asyncForEach, createClassName } from '../helpers';


const handleFormSubmit = (event) => event.preventDefault();

export const Form = ({ children, ...args }) => (
	<form noValidate onSubmit={handleFormSubmit} className={createClassName(styles, 'form')} {...args}>
		{children}
	</form>
);

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

export const TextInput = ({
	disabled,
	error,
	small,
	multiple = 1,
	...args
}) => (
	multiple < 2 ? (
		<input
			type="text"
			disabled={disabled}
			className={[
				createClassName(styles, 'form__input'),
				createClassName(styles, 'form__input-text', { disabled, error, small }),
			].join(' ')}
			{...args}
		/>
	) : (
		<textarea
			rows={multiple}
			disabled={disabled}
			className={[
				createClassName(styles, 'form__input'),
				createClassName(styles, 'form__input-text', { disabled, error, small }),
			].join(' ')}
			{...args}
		/>
	)
);

export const PasswordInput = ({
	disabled,
	error,
	small,
	...args
}) => (
	<input
		type="password"
		disabled={disabled}
		className={[
			createClassName(styles, 'form__input'),
			createClassName(styles, 'form__input-password', { disabled, error, small }),
		].join(' ')}
		{...args}
	/>
);


export class SelectInput extends Component {
	state = {
		value: this.props.value,
	}

	handleChange = (event) => {
		const { onChange } = this.props;
		onChange && onChange(event);

		if (event.defaultPrevented) {
			return;
		}

		this.setState({ value: event.target.value });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasOwnProperty('value') && nextProps.value !== this.props.value) {
			this.setState({ value: nextProps.value });
		}
	}

	render() {
		const {
			// eslint-disable-next-line no-unused-vars
			value,
			// eslint-disable-next-line no-unused-vars
			onChange,
			options = [],
			placeholder,
			disabled,
			error,
			small,
			...args
		} = this.props;

		return (
			<div
				className={[
					createClassName(styles, 'form__input'),
					createClassName(styles, 'form__input-select'),
				].join(' ')}
			>
				<select
					value={this.state.value}
					disabled={disabled}
					onChange={this.handleChange}
					className={createClassName(styles, 'form__input-select__select', {
						disabled,
						error,
						small,
						placeholder: !this.state.value,
					})}
					{...args}
				>
					<option value="" disabled hidden>{placeholder}</option>
					{Array.from(options).map(({ value, label }) => (
						<option value={value} className={createClassName(styles, 'form__input-select__option')}>{label}</option>
					))}
				</select>
				<Arrow className={createClassName(styles, 'form__input-select__arrow')} />
			</div>
		);
	}
}

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

const fieldValidations = {
	required: ({ target: { value } }) => (value ?
		{ valid: true } : { valid: false, error: 'Field required' }),

	email: ({ target: { value } }) => (!value || /^\S+@\S+\.\S+/.test(String(value).toLowerCase()) ?
		{ valid: true } : { valid: false, error: 'Invalid email' }),
};

export class Field extends Component {
	static validations = fieldValidations;

	handleChange = async(event) => {
		const { onChange } = this.props;
		onChange && onChange(event);

		if (event.defaultPrevented) {
			return;
		}

		const { error } = await this.validateChange(event);
		if (error !== this.state.error) {
			this.setState({ error });
		}
	}

	validateChange = async(event) => {
		const validations = [
			...(this.props.validations || []),
			this.props.required && Field.validations.required,
		]
			.map((validation) => (typeof validation === 'string' ? Field.validations[validation] : validation))
			.filter((validation, index, validations) => validation && validations.indexOf(validation) === index);

		for (const validation of validations) {
			const result = await validation(event);

			if (!result.valid) {
				return result;
			}
		}

		return { valid: true };
	}

	state = {
		error: false,
	}

	renderLabel = ({ label, required, error }) => (
		label && <Label error={!!error}>{label}{required && ' *'}</Label>
	)

	renderChild = ({ children, error }) => (
		typeof children[0] === 'function' && children[0]({ error, onChange: this.handleChange })
	)

	renderDescription = ({ description, error }) => (
		(error || description) && <Description error={!!error}>{error || description}</Description>
	)

	render() {
		const { inline, label, required, description, children } = this.props;
		const error = this.state.error || this.props.error;

		return (
			<Item inline={inline}>
				{this.renderLabel({ label, required, error })}
				{this.renderChild({ children, error })}
				{this.renderDescription({ description, error })}
			</Item>
		);
	}
}

export {
	TextInput as Input,
};
