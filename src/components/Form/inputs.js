import { Component } from 'preact';
import styles from './style';
import { createClassName } from '../helpers';


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
