import { h, Component } from 'preact';
import style from './style';
import { asyncForEach } from '../helpers';


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

const getStyles = (style, name, classes) => [style[name], ...Object.entries(style).filter(([key]) => classes[key]).map(([, value]) => value)].join(' ');

export const Input = ({ children, disabled, error, danger, stack, small, multiple = 1, ...args }) => {
	const El = multiple < 2 ? 'input' : 'textarea';
	return (<El {...args} rows={multiple} disabled={disabled} className={getStyles(style, 'input', {
		disabled,
		error,
		danger,
		stack,
		small,
	})}
	>{children}</El>);
};

export const Select = ({ children, disabled, error, danger, stack, small, ...args }) => (
	<input {...args} disabled={disabled} className={getStyles(style, 'input', {
		disabled,
		error,
		danger,
		stack,
		small,
	})}
	>{children}</input>
);

export const Form = ({ children, ...args }) => <form onSubmit={(e) => e.preventDefault()} {...args}> {children} </form>;

export const Label = ({ children, error }) => (<label className={getStyles(style, 'label', {
	error,
})}
                                               >{children}</label>);

export const Description = ({ children }) => <small className={style.description}>{children}</small>;

export const Error = ({ children }) => (<small
	className={getStyles(style, 'description', {
		error: true,
	})}
                                        >{children}</small>);

export const Item = ({ children, inline }) => (
	<div
		className={getStyles(style, 'formGroup', { inline })}
	>
		{children}
	</div>);

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
		return (<Item>
			<Label error={error}>{label}{required && ' *'}</Label>
			<Input {...args} ref={(el) => this.el = el} error={error} onChange={this.onChange} name={name}>{children}</Input>
			{description && <Description>{description}</Description>}
			{error && <Error>{error}</Error>}
		</Item>);
	}

}
