import { h, Component } from 'preact';
import Arrow from '../../icons/arrow.svg';
import styles from './style';
import { asyncForEach, createClassName } from '../helpers';


const handleFormSubmit = (event) => event.preventDefault();

export const Form = ({ children, ...args }) => (
	<form onSubmit={handleFormSubmit} className={createClassName(styles, 'form')} {...args}>
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

	handleInput = (onInput) => (event) => {
		this.setState({ value: event.target.value });
		onInput && onInput(event);
	}

	componentWillReceiveProps({ value }) {
		this.setState({ value });
	}

	render() {
		const {
			// eslint-disable-next-line no-unused-vars
			value,
			options = {},
			placeholder,
			disabled,
			error,
			small,
			onInput,
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
					onInput={this.handleInput(onInput)}
					className={createClassName(styles, 'form__input-select__select', {
						disabled,
						error,
						small,
						placeholder: !this.state.value,
					})}
					{...args}
				>
					<option value="" disabled hidden>{placeholder}</option>
					{Object.entries(options).map(([value, label]) => (
						<option value={value} className={createClassName(styles, 'form__input-select__option')}>{label}</option>
					))}
				</select>
				<Arrow className={createClassName(styles, 'form__input-select__arrow')} />
			</div>
		);
	}
}

const validations = {
	notNull: (value) => {
		if (!value) {
			throw 'Field required';
		}
	},
	email(value) {
		const re = /^\S+@\S+\.\S+/;
		if (value && !re.test(String(value).toLowerCase())) {
			throw 'Invalid email';
		}
	},
};

export class InputField extends Component {
	onChange = () => {
		this.props.onChange();
		this.validateAndChangeState();
	}

	validateAndChangeState = async() => {
		try {
			await this.validate(true);
			this.setState({
				error: false,
			});
		} catch (error) {
			this.setState({
				error,
			});
		}
	}

	validate = async(t = false) => {
		const { base: { value } } = this.el;
		try {
			await asyncForEach(this.props.validations, (fn) => {
				if (typeof fn === 'string') {
					return validations[fn](value);
				}
				fn(value);
			});
			return true;
		} catch (error) {
			if (t) {
				throw error;
			}
			return false;
		}
	}

	get value() {
		const { base: { value } } = this.el;
		return value;
	}

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			error: false,
		};
		this.onChange = this.onChange.bind(this);
	}

	render() {
		const { children, required, label, name, description, ...args } = this.props;
		const { error } = this.state;

		return (
			<Item>
				<Label error={error}>{label}{required && ' *'}</Label>
				<TextInput {...args} ref={(el) => this.el = el} error={error} onChange={this.onChange} name={name}>{children}</TextInput>
				{description && <Description>{description}</Description>}
				{error && <Error>{error}</Error>}
			</Item>
		);
	}
}

export const Field = ({
	inline,
	label,
	required,
	description,
	error,
	type = 'text',
	...args
}) => (
	<Item inline={inline}>
		{label && <Label error={!!error}>{label}{required && ' *'}</Label>}
		{h({
			text: TextInput,
			password: PasswordInput,
			select: SelectInput,
		}[type], { error: !!error, ...args })}
		{(error || description) && <Description error={!!error}>{error || description}</Description>}
	</Item>
);

export {
	TextInput as Input,
};
