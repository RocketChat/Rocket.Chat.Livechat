import { Component } from 'preact';
import {Button} from '../../components/Button';
import  { Form, Validations, FormField, TextInput } from '../../components/Form';
import { ExperienceRating } from '../../components/Form/ExperienceRating';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';
import { ButtonGroup } from '../../components/ButtonGroup';


export default class SurveyFeedback extends Component {
	state = {
		rating: { value: '' },
		message: { value: '' },
	}

	validations = {
		rating: [Validations.nonEmpty],
		message: [],
	}

	getValidableFields = () => Object.keys(this.validations)
		.map((fieldName) => (this.state[fieldName] ? { fieldName, ...this.state[fieldName] } : null))
		.filter(Boolean)

	validate = (fieldName, value) => this.validations[fieldName].reduce((error, validation) => (error || validation(this.state[fieldName])), undefined)

	validateAll = () => {
		for (const { fieldName, value } of this.getValidableFields()) {
			const error = this.validate(fieldName, value);
			this.setState({ [fieldName]: { ...this.state[fieldName], value, error, showError: false } });
		}
	}

	isValid = () => this.getValidableFields().every(({ error } = {}) => !error)

	handleFieldChange = (fieldName) => ({ target: { value } }) => {
		this.setState({ [fieldName]: { value } });
		// check for errors
		const error = this.validate(fieldName, value);
		this.setState({ [fieldName]: { ...this.state[fieldName], value, error, showError: false } });
	}

	handleRatingChange = this.handleFieldChange('rating')

	handleMessageChange = this.handleFieldChange('message')

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.props.onSubmit) {
			const values = Object.entries(this.state)
				.filter(([, state]) => state !== null)
				.map(([name, { value }]) => ({ [name]: value }))
				.reduce((values, entry) => ({ ...values, ...entry }), {});
			this.props.onSubmit(values);
		}
	}

	constructor(props) {
		super(props);
		this.validateAll();
	}

	render({ title, color, message: messageProp, loading, ...props }, { rating, message }) {
		const valid = this.isValid();

		return (
			<Screen
				title={title}
				color={color}
				className={createClassName(styles, 'survey-feedback')}
				{...props}
			>
				<Screen.Content>
					<p className={createClassName(styles, 'survey-feedback__message')}>{messageProp}</p>
					<Form onSubmit={this.handleSubmit}>
						<ExperienceRating value={rating.value} onChange={this.handleRatingChange} />
						<FormField>
							<TextInput
								id="message"
								name="message"
								placeholder={I18n.t('Do you have anything to say? Leave your opinion here (optional)')}
								rows={4}
								disabled={loading}
								value={message.value}
								multiline={true}
								onInput={this.handleMessageChange}
							/>
						</FormField>

						<ButtonGroup>
							<Button submit loading={loading} disabled={!valid || loading} stack>{I18n.t('Send')}</Button>
							<Button disabled={loading} stack secondary nude onClick={this.handleCancelClick}>{I18n.t('No, thanks')}</Button>
						</ButtonGroup>
					</Form>
				</Screen.Content>
			</Screen>
		);
	}
}
