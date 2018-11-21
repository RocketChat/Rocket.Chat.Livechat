import { h, Component } from 'preact';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Form, Validations } from '../../components/Form';
import { createClassName } from '../../components/helpers';
import styles from './styles';


export default class Home extends Component {
	state = {
		name: null,
		email: null,
		department: null,
	}

	validations = {
		name: [Validations.nonEmpty],
		email: [Validations.nonEmpty, Validations.email],
		department: [Validations.nonEmpty],
	}

	validate = (fieldName, value) => this.validations[fieldName].reduce((error, validation) => (error || validation(value)), undefined)

	validateAll = () => {
		for (const fieldName of Object.keys(this.validations)) {
			const { value } = this.state[fieldName];
			const error = this.validate(fieldName, value);
			this.setState({ [fieldName]: { ...this.state[fieldName], value, error, showError: false } });
		}
	}

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
				.map(([name, { value }]) => ({ [name]: value }))
				.reduce((values, entry) => ({ ...values, ...entry }), {});
			this.props.onSubmit(values);
		}
	}

	constructor(props) {
		super(props);

		const { settings: { nameFieldRegistrationForm, emailFieldRegistrationForm, allowSwitchingDepartments },
			departments } = props;

		if (nameFieldRegistrationForm) {
			this.state.name = { value: '' };
		}

		if (emailFieldRegistrationForm) {
			this.state.email = { value: '' };
		}

		if (allowSwitchingDepartments && departments && departments.length > 0) {
			this.state.department = { value: '' };
		}

		this.validateAll();
	}

	componentWillReceiveProps({ settings: { nameFieldRegistrationForm, emailFieldRegistrationForm, allowSwitchingDepartments },
		departments }) {
		const hasName = nameFieldRegistrationForm;
		const hasEmail = emailFieldRegistrationForm;
		const hasDepartment = allowSwitchingDepartments && departments && departments.length > 0;


		if (hasName && !this.state.name) {
			this.setState({ name: { value: '' } });
		} else if (!nameFieldRegistrationForm) {
			this.setState({ name: null });
		}

		if (hasEmail && !this.state.email) {
			this.setState({ email: { value: '' } });
		} else if (!hasEmail) {
			this.setState({ email: null });
		}

		if (hasDepartment && !this.state.department) {
			this.setState({ department: { value: '' } });
		} else if (!hasDepartment) {
			this.setState({ department: null });
		}
	}

	render() {
		const { title, color, message, loading, departments } = this.props;
		const valid = [this.state.name, this.state.email, this.state.department].every(({ error }) => !error);

		return (
			<div class={createClassName(styles, 'register')}>
				<Header color={color}>
					<Header.Content>
						<Header.Title>{title}</Header.Title>
					</Header.Content>
				</Header>

				<main className={createClassName(styles, 'register__main')}>
					<p className={createClassName(styles, 'register__main-message')}>{message}</p>

					<Form onSubmit={this.handleSubmit}>
						{this.state.name && (
							<Form.Item>
								<Form.Label error={this.state.name.showError}>Name *</Form.Label>
								<Form.TextInput
									name="name"
									placeholder="Insert your name here..."
									disabled={loading}
									value={this.state.name.value}
									error={this.state.name.showError}
									onChange={this.handleNameChange}
								/>
								<Form.Description error={this.state.name.showError}>
									{this.state.name.showError && this.state.name.error}
								</Form.Description>
							</Form.Item>
						)}

						{this.state.email && (
							<Form.Item>
								<Form.Label error={this.state.email.showError}>E-mail *</Form.Label>
								<Form.TextInput
									name="email"
									placeholder="Insert your name here..."
									disabled={loading}
									value={this.state.email.value}
									error={this.state.email.showError}
									onChange={this.handleEmailChange}
								/>
								<Form.Description error={this.state.email.showError}>
									{this.state.email.showError && this.state.email.error}
								</Form.Description>
							</Form.Item>
						)}

						{this.state.department && (
							<Form.Item>
								<Form.Label error={this.state.department.showError}>I need help with... *</Form.Label>
								<Form.SelectInput
									name="department"
									placeholder="Choose an option..."
									options={departments.map(({ _id, name }) => ({ value: _id, label: name }))}
									disabled={loading}
									value={this.state.department.value}
									error={this.state.department.showError}
									onChange={this.handleDepartmentChange}
								/>
								<Form.Description error={this.state.department.showError}>
									{this.state.department.showError && this.state.department.error}
								</Form.Description>
							</Form.Item>
						)}

						<Form.Item>
							<Button loading={loading} disabled={!valid || loading} stack>Start Chat</Button>
						</Form.Item>
					</Form>
				</main>

				<Footer>
					<Footer.Content>
						<Footer.PoweredBy />
					</Footer.Content>
				</Footer>
			</div>
		);
	}
}
