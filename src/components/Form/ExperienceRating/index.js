import { Component } from 'preact';
import styles from './style';
import { createClassName } from '../../helpers';
import Rating1 from './RatingEmojis/rating-value-1.png';
import Rating2 from './RatingEmojis/rating-value-2.png';
import Rating3 from './RatingEmojis/rating-value-3.png';
import Rating4 from './RatingEmojis/rating-value-4.png';
import Rating5 from './RatingEmojis/rating-value-5.png';

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
				<img src={label} className={createClassName(styles, 'form__input-experience-rating__label-icon')}/>
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


	render() {
		return (
			<div
				className={[
					createClassName(styles, 'form__input'),
					createClassName(styles, 'form__input-experience-rating'),
				].join(' ')}
			>
				<ExperienceRatingItem value="1" label={Rating1} description="Very bad" onChange={this.handleChange} checked={this.isChecked('1')} />
				<ExperienceRatingItem value="2" label={Rating2} description="Bad" onChange={this.handleChange} checked={this.isChecked('2')} />
				<ExperienceRatingItem value="3" label={Rating3} description="Ok" onChange={this.handleChange} checked={this.isChecked('3')} />
				<ExperienceRatingItem value="4" label={Rating4} description="Good" onChange={this.handleChange} checked={this.isChecked('4')} />
				<ExperienceRatingItem value="5" label={Rating5} description="Awesome" onChange={this.handleChange} checked={this.isChecked('5')} />
			</div>
		);
	}
}
