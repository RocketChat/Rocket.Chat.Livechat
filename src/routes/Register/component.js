import { Component } from 'preact';
import Button from '../../components/Button';
import Form, { Validations } from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';


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

		if (hasDepartmentField && departments && departments.length > 0) {
			this.state.department = { value: '' };
		}

		this.validateAll();
	}

	componentWillReceiveProps({ hasNameField, hasEmailField, hasDepartmentField, departments }) {
		if (hasNameField && !this.state.name) {
			this.setState({ name: { value: '' } });
		} else if (!hasNameField) {
			this.setState({ name: null });
		}

		if (hasEmailField && !this.state.email) {
			this.setState({ email: { value: '' } });
		} else if (!hasEmailField) {
			this.setState({ email: null });
		}

		const showDepartmentField = hasDepartmentField && departments && departments.length > 0;

		if (showDepartmentField && !this.state.department) {
			this.setState({ department: { value: '' } });
		} else if (!showDepartmentField) {
			this.setState({ department: null });
		}
	}

	render({ title, color, message, loading, departments, ...props }, { name, email, department }) {
		const valid = this.isValid();

		return (
			<Screen
				color={color}
				title={title}
				className={createClassName(styles, 'register')}
				{...props}
			>
				<p className={createClassName(styles, 'register__message')}>{message}</p>

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

					{department && (
						<Form.Item>
							<Form.Label error={department.showError} htmlFor="department">I need help with...</Form.Label>
							<Form.SelectInput
								id="department"
								name="department"
								placeholder="Choose an option..."
								options={departments.map(({ _id, name }) => ({ value: _id, label: name }))}
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

					<Form.Item>
						<Button loading={loading} disabled={!valid || loading} stack>Start Chat</Button>
					</Form.Item>
				</Form>
			</Screen>
		);
	}
}
