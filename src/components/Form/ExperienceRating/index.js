import { Component } from 'preact';
import styles from './style';
import { createClassName } from '../../helpers';
import { Emoji } from 'emoji-mart';

const ExperienceRatingItem = ({ value, label, description, checked, onChange }) => (
	<div className={createClassName(styles, 'form__input-experience-rating__item')}>
		<div className={createClassName(styles, 'form__input-experience-rating__input-container', { checked })}>
			<input
				type="radio"
				name="experience-rating"
				id={value}
				value={value}
				className={createClassName(styles, 'form__input-experience-rating__input')}
				checked={checked}
				onChange={onChange}
			/>
			<label className={createClassName(styles, 'form__input-experience-rating__label')} for={value}>
				{label}
			</label>
		</div>
		{checked && <span className={createClassName(styles, 'form__input-experience-rating__description')}>{description}</span>}
	</div>
);

export class ExperienceRating extends Component {
	state = {
		value: this.props.value,
	}

	handleChange = (event) => {
		const { onChange } = this.props;
		onChange && onChange(event);
		this.setState({ value: event.target.value });
	}

	isChecked = (itemValue) => {
		const { value } = this.state;
		return value === itemValue;
	}

	renderEmoji = (emojiShortName) => {
		return Emoji({
			set: 'apple',
			emoji: emojiShortName,
			size: 32,
			sheetSize: 64,
		  })
	}

	render() {
		return (
			<div
				className={[
					createClassName(styles, 'form__input'),
					createClassName(styles, 'form__input-experience-rating'),
				].join(' ')}
			>
				<ExperienceRatingItem value="1" label={this.renderEmoji('white_frowning_face')} description="Very bad" onChange={this.handleChange} checked={this.isChecked('1')} />
				<ExperienceRatingItem value="2" label={this.renderEmoji('slightly_frowning_face')} description="Bad" onChange={this.handleChange} checked={this.isChecked('2')} />
				<ExperienceRatingItem value="3" label={this.renderEmoji('neutral_face')} description="Ok" onChange={this.handleChange} checked={this.isChecked('3')} />
				<ExperienceRatingItem value="4" label={this.renderEmoji('slightly_smiling_face')} description="Good" onChange={this.handleChange} checked={this.isChecked('4')} />
				<ExperienceRatingItem value="5" label={this.renderEmoji('smile')} description="Awesome" onChange={this.handleChange} checked={this.isChecked('5')} />
			</div>
		);
	}
}
