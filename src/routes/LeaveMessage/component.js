import { Component } from 'preact';
import { Button } from '../../components/Button';
import { Form, FormItem, Label, Description, TextInput, Validations } from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName, sortArrayByColumn } from '../../components/helpers';
import styles from './styles';


const defaultTitle = I18n.t('Leave a message');
const defaultMessage = I18n.t('We are not online right now. Please, leave a message.');
const defaultUnavailableMessage = ''; // TODO

export default class LeaveMessage extends Component {
	state = {
		name: { value: '' },
		email: { value: '' },
		department: null,
		message: { value: '' },
	}

	validations = {
		name: [Validations.nonEmpty],
		email: [Validations.nonEmpty, Validations.email],
		department: [],
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

	handleDepartmentChange = this.handleFieldChange('department')

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

		const { hasDepartmentField, departments } = props;

		if (hasDepartmentField && departments) {

			if (departments.length > 0) {
				this.state.department = { value: '' };
			} else {
				this.state.department = null;
			}
		}

		this.validateAll();
	}

	renderForm = ({ loading, departments, valid = this.isValid() }, { name, email, department, message }) => (
		<Form onSubmit={this.handleSubmit}>
			{name && (
				<FormItem>
					<Label error={name.showError} htmlFor="name">{I18n.t('Name')} *</Label>
					<TextInput
						name="name"
						placeholder={I18n.t('Insert your name here...')}
						disabled={loading}
						value={name.value}
						error={name.showError}
						onInput={this.handleNameChange}
					/>
					<Description error={name.showError}>
						{name.showError && name.error}
					</Description>
				</FormItem>
			)}

			{email && (
				<FormItem>
					<Label error={email.showError} htmlFor="email">{I18n.t('Email')} *</Label>
					<TextInput
						name="email"
						placeholder={I18n.t('Insert your email here...')}
						disabled={loading}
						value={email.value}
						error={email.showError}
						onInput={this.handleEmailChange}
					/>
					<Description error={email.showError}>
						{email.showError && email.error}
					</Description>
				</FormItem>
			)}

			{department && (
				<Form.Item>
					<Form.Label error={department.showError} htmlFor="department">{I18n.t('I need help with...')}</Form.Label>
					<Form.SelectInput
						name="department"
						placeholder={I18n.t('Choose an option...')}
						options={sortArrayByColumn(departments, 'name').map(({ _id, name }) => ({ value: _id, label: name }))}
						disabled={loading}
						value={department.value}
						error={department.showError}
						onInput={this.handleDepartmentChange}
					/>
					<Form.Description error={department.showError}>
						{department.showError && department.error}
					</Form.Description>
				</Form.Item>
			)}

			{message && (
				<FormItem>
					<Label error={message.showError} htmlFor="message">{I18n.t('Message')} *</Label>
					<TextInput
						name="message"
						placeholder={I18n.t('Write your message...')}
						multiple={4}
						disabled={loading}
						value={message.value}
						error={message.showError}
						onInput={this.handleMessageChange}
					/>
					<Description error={message.showError}>
						{message.showError && message.error}
					</Description>
				</FormItem>
			)}

			<FormItem>
				<Button submit loading={loading} disabled={!valid || loading} stack>{I18n.t('Send')}</Button>
			</FormItem>
		</Form>
	)

	render = ({ color, title, message, unavailableMessage, hasForm, ...props }) => (
		<Screen
			color={color}
			title={title || defaultTitle}
			className={createClassName(styles, 'leave-message')}
			{...props}
		>
			<Screen.Content>
				<p className={createClassName(styles, 'leave-message__main-message')}>
					{hasForm ? (message || defaultMessage) : (unavailableMessage || defaultUnavailableMessage)}
				</p>

				{hasForm && this.renderForm(this.props, this.state)}
			</Screen.Content>
			<Screen.Footer />
		</Screen>
	)
}
