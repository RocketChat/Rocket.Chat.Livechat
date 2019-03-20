import { Component } from 'preact';
import { createClassName } from '../../helpers';
import styles from './styles';
import ArrowIcon from '../../../icons/arrowDown.svg';


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

	componentWillReceiveProps({ value: nextValue }) {
		const { value } = this.props;
		if (nextValue !== value) {
			this.setState({ value: nextValue });
		}
	}

	render = ({
		options = [],
		placeholder,
		disabled,
		small,
		error,
		onInput,
		className,
		style = {},
	}) => (
		<div
			className={createClassName(styles, 'form__input-select', {}, [className])}
			style={style}
		>
			<select
				value={this.state.value}
				disabled={disabled}
				onChange={this.handleChange}
				onInput={onInput}
				className={createClassName(styles, 'form__input-select__select', {
					disabled,
					error,
					small,
					placeholder: !this.state.value,
				})}
			>
				<option value="" disabled hidden>{placeholder}</option>
				{Array.from(options).map(({ value, label }, key) => (
					<option key={key} value={value} className={createClassName(styles, 'form__input-select__option')}>{label}</option>
				))}
			</select>
			<ArrowIcon className={createClassName(styles, 'form__input-select__arrow')} />
		</div>
	)
}
