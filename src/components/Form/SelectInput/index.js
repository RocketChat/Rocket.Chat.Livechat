import { Component } from 'preact';

import { createClassName } from '../../helpers';
import styles from './styles.scss';
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
		name,
		placeholder,
		options = [],
		disabled,
		small,
		error,
		onInput,
		className,
		style = {},
		...props
	}) => (
		<div
			className={createClassName(styles, 'select-input', {}, [className])}
			style={style}
		>
			<select
				name={name}
				value={this.state.value}
				disabled={disabled}
				onChange={this.handleChange}
				onInput={onInput}
				className={createClassName(styles, 'select-input__select', {
					disabled,
					error,
					small,
					placeholder: !this.state.value,
				})}
				{...props}
			>
				<option value="" disabled hidden>{placeholder}</option>
				{Array.from(options).map(({ value, label }, key) => (
					<option key={key} value={value} className={createClassName(styles, 'select-input__option')}>{label}</option>
				))}
			</select>
			<ArrowIcon className={createClassName(styles, 'select-input__arrow')} />
		</div>
	)
}
