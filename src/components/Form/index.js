import { h, Component } from 'preact';
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
	danger,
	stack,
	small,
	multiple = 1,
	...args
}) => h(
	multiple < 2 ? 'input' : 'textarea',
	{
		rows: multiple,
		disabled,
		className: createClassName(styles, 'form__textinput', {
			error,
			danger,
			stack,
			small,
		}),
		...args,
	}
);

export const Input = TextInput;

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

/*
export const Select = ({ children, disabled, error, danger, stack, small, ...args }) => (
	<input {...args} disabled={disabled} className={getStyles(styles, 'input', {
		disabled,
		error,
		danger,
		stack,
		small,
	})}
	>{children}</input>
);
*/

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

	render({ children, required, label, name, description, ...args }) {
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
