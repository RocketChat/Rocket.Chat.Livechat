import { Component } from 'preact';
import { Button } from '../../components/Button';
import { Form, FormItem, Label, Description, TextInput, SelectInput, Validations } from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName, sortArrayByColumn } from '../../components/helpers';
import styles from './styles';


const defaultTitle = I18n.t('Need help?');
const defaultMessage = I18n.t('Please, tell us some informations to start the chat');

export default class Register extends Component {
	state = {
		name: null,
		email: null,
		department: null,
	}

	validations = {
		name: [Validations.nonEmpty],
		email: [Validations.nonEmpty, Validations.email],
		department: [],
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

		const { hasNameField, hasEmailField, hasDepartmentField, departments } = props;

		if (hasNameField) {
			this.state.name = { value: '' };
		}

		if (hasEmailField) {
			this.state.email = { value: '' };
		}

		if (hasDepartmentField && departments) {

			if (departments.length > 1) {
				this.state.department = { value: '' };
			} else if (departments.length === 1) {
				this.state.department = { value: departments[0]._id };
			} else {
				this.state.department = null;
			}
		}

		this.validateAll();
	}

	componentWillReceiveProps({ hasNameField, hasEmailField, hasDepartmentField, departmentDefault, departments, nameDefault, emailDefault }) {
		const nameValue = nameDefault || '';
		if (hasNameField && (!this.state.name || this.state.name !== nameValue)) {
			this.setState({ name: { ...this.state.name, value: nameValue } });
		} else if (!hasNameField) {
			this.setState({ name: null });
		}

		const emailValue = emailDefault || '';
		if (hasEmailField && (!this.state.email || this.state.name !== emailValue)) {
			this.setState({ email: { ...this.state.email, value: emailValue } });
		} else if (!hasEmailField) {
			this.setState({ email: null });
		}

		const departmentValue = departmentDefault || (departments && departments.length === 1 && departments[0]._id) || '';
		const showDepartmentField = hasDepartmentField && departments && departments.length > 1;
		if (showDepartmentField && (!this.state.department || this.state.department !== departmentValue)) {
			this.setState({ department: { ...this.state.department, value: departmentValue } });
		} else if (!showDepartmentField) {
			this.setState({ department: null });
		}
	}

	render({ title, color, message, loading, departments, ...props }, { name, email, department }) {
		const valid = this.isValid();

		return (
			<Screen
				color={color}
				title={title || defaultTitle}
				className={createClassName(styles, 'register')}
				{...props}
			>
				<Screen.Content>
					<p className={createClassName(styles, 'register__message')}>{message || defaultMessage}</p>

					<Form onSubmit={this.handleSubmit}>
						{name && (
							<FormItem>
								<Label error={name.showError} htmlFor="name">{I18n.t('Name')} *</Label>
								<TextInput
									id="name"
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
									id="email"
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
							<FormItem>
								<Label error={department.showError} htmlFor="department">{I18n.t('I need help with...')}</Label>
								<SelectInput
									id="department"
									name="department"
									placeholder={I18n.t('Choose an option...')}
									options={sortArrayByColumn(departments, 'name').map(({ _id, name }) => ({ value: _id, label: name }))}
									disabled={loading}
									value={department.value}
									error={department.showError}
									onInput={this.handleDepartmentChange}
								/>
								<Description error={department.showError}>
									{department.showError && department.error}
								</Description>
							</FormItem>
						)}

						<FormItem style={{ 'margin-bottom': '0' }}>
							<Button submit loading={loading} disabled={!valid || loading} stack>{I18n.t('Start chat')}</Button>
						</FormItem>
					</Form>
				</Screen.Content>
				<Screen.Footer />
			</Screen>
		);
	}
}
