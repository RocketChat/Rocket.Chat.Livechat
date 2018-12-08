import { Component } from 'preact';
import Button from '../../components/Button';
import Form, { Validations } from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';


export default class LeaveMessage extends Component {
	state = {
		name: { value: '' },
		email: { value: '' },
		message: { value: '' },
	}

	validations = {
		name: [Validations.nonEmpty],
		email: [Validations.nonEmpty, Validations.email],
		message: [Validations.nonEmpty],
	}

	getValidableFields = () => Object.keys(this.validations)
		.map((fieldName) => (this.state[fieldName] ? { fieldName, ...this.state[fieldName] } : null))
		.filter(Boolean)

	validate = (fieldName, value) => this.validations[fieldName].reduce((error, validation) => (error || validation(value)), undefined)

	validateAll = () => {
		for (const { fieldName, value } of this.getValidableFields()) {
			const error = this.validate(fieldName, value);
			this.setState({ [fieldName]: { ...this.state[fieldName], value, error, showError: false } });
		}
	}

	isValid = () => this.getValidableFields().every(({ error } = {}) => !error)

	handleFieldChange = (fieldName) => ({ target: { value } }) => {
		const error = this.validate(fieldName, value);
		this.setState({ [fieldName]: { ...this.state[fieldName], value, error, showError: false } });
	}

	handleNameChange = this.handleFieldChange('name')

	handleEmailChange = this.handleFieldChange('email')

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

	render({ color, title, message: messageProp, loading, ...props }, { name, email, message }) {
		const valid = this.isValid();

		return (
			<Screen
				color={color}
				title={title}
				className={createClassName(styles, 'leave-message')}
				{...props}
			>
				<p className={createClassName(styles, 'leave-message__main-message')}>{messageProp}</p>

				<Form onSubmit={this.handleSubmit}>
					{name && (
						<Form.Item>
							<Form.Label error={name.showError} htmlFor="name">Name *</Form.Label>
							<Form.TextInput
								id="name"
								name="name"
								placeholder="Insert your name here..."
								disabled={loading}
								value={name.value}
								error={name.showError}
								onInput={this.handleNameChange}
							/>
							<Form.Description error={name.showError}>
								{name.showError && name.error}
							</Form.Description>
						</Form.Item>
					)}

					{email && (
						<Form.Item>
							<Form.Label error={email.showError} htmlFor="email">Email *</Form.Label>
							<Form.TextInput
								id="email"
								name="email"
								placeholder="Insert your email here..."
								disabled={loading}
								value={email.value}
								error={email.showError}
								onInput={this.handleEmailChange}
							/>
							<Form.Description error={email.showError}>
								{email.showError && email.error}
							</Form.Description>
						</Form.Item>
					)}

					{message && (
						<Form.Item>
							<Form.Label error={message.showError} htmlFor="message">Message *</Form.Label>
							<Form.TextInput
								id="message"
								name="message"
								placeholder="Write your message..."
								multiple={4}
								disabled={loading}
								value={message.value}
								error={message.showError}
								onInput={this.handleMessageChange}
							/>
							<Form.Description error={message.showError}>
								{message.showError && message.error}
							</Form.Description>
						</Form.Item>
					)}

					<Form.Item>
						<Button loading={loading} disabled={!valid || loading} stack>Send</Button>
					</Form.Item>
				</Form>
			</Screen>
		);
	}
}
