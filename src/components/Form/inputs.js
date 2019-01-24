import { Component } from 'preact';
import Arrow from '../../icons/arrowDown.svg';
import styles from './style';
import { createClassName } from '../helpers';

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

export class FileUploadInput extends Component {
	state = {
		value: null,
	}

	get value() {
		return this.state.value;
	}

	get input() {
		return this.inputFile;
	}

	handleInputRef = (ref) => {
		this.inputFile = ref;
	}

	handleChange = (event) => {
		this.setState({ value: event.target.files[0] });

		const { onChange } = this.props;
		onChange && onChange(event);
	}

	render() {
		const {
			disabled,
			error,
			hidden,
			small,
			// eslint-disable-next-line no-unused-vars
			onChange,
			...args
		} = this.props;

		return (
			<input
				ref={this.handleInputRef}
				type="file"
				disabled={disabled}
				onChange={this.handleChange}
				className={[
					createClassName(styles, 'form__input'),
					createClassName(styles, 'form__input-file', { hidden, disabled, error, small }),
				].join(' ')}
				{...args}
			/>
		);
	}
}

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
					{Array.from(options).map(({ value, label }, key) => (
						<option key={key} value={value} className={createClassName(styles, 'form__input-select__option')}>{label}</option>
					))}
				</select>
				<Arrow className={createClassName(styles, 'form__input-select__arrow')} />
			</div>
		);
	}
}
