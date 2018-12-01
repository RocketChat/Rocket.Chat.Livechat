import { Component } from 'preact';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Form, Validations } from '../../components/Form';
import { createClassName } from '../../components/helpers';
import Bell from '../../icons/bell.svg';
import Arrow from '../../icons/arrow.svg';
import NewWindow from '../../icons/newWindow.svg';
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
		.filter(Boolean);

	validate = (fieldName, value) => this.validations[fieldName].reduce((error, validation) => (error || validation(value)), undefined)

	validateAll = () => {
		for (const { fieldName, value } of this.getValidableFields()) {
			const error = this.validate(fieldName, value);
			this.setState({ [fieldName]: { ...this.state[fieldName], value, error, showError: false } });
		}
	}

	isValid = () => this.getValidableFields().every(({ error } = {}) => !error)

	handleToggleNotification = () => {
		const { onToggleNotification } = this.props;
		onToggleNotification && onToggleNotification();
	}

	handleToggleMinimize = () => {
		const { onToggleMinimize } = this.props;
		onToggleMinimize && onToggleMinimize();
	}

	handleToggleFullScreen = () => {
		const { onToggleFullScreen } = this.props;
		onToggleFullScreen && onToggleFullScreen();
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

	render() {
		const { title, color, message, loading, departments } = this.props;
		const valid = this.isValid();

		return (
			<div class={createClassName(styles, 'register')}>
				<Header color={color}>
					<Header.Content>
						<Header.Title>{title}</Header.Title>
					</Header.Content>
					<Header.Actions>
						<Header.Action onClick={this.handleToggleNotification}><Bell width={20} /></Header.Action>
						<Header.Action onClick={this.handleToggleMinimize}><Arrow width={20} /></Header.Action>
						<Header.Action onClick={this.handleToggleFullScreen}><NewWindow width={20} /></Header.Action>
					</Header.Actions>
				</Header>

				<main className={createClassName(styles, 'register__main')}>
					<p className={createClassName(styles, 'register__main-message')}>{message}</p>

					<Form onSubmit={this.handleSubmit}>
						{this.state.name && (
							<Form.Item>
								<Form.Label error={this.state.name.showError} htmlFor="name">Name *</Form.Label>
								<Form.TextInput
									id="name"
									name="name"
									placeholder="Insert your name here..."
									disabled={loading}
									value={this.state.name.value}
									error={this.state.name.showError}
									onInput={this.handleNameChange}
								/>
								<Form.Description error={this.state.name.showError}>
									{this.state.name.showError && this.state.name.error}
								</Form.Description>
							</Form.Item>
						)}

						{this.state.email && (
							<Form.Item>
								<Form.Label error={this.state.email.showError} htmlFor="email">Email *</Form.Label>
								<Form.TextInput
									id="email"
									name="email"
									placeholder="Insert your name here..."
									disabled={loading}
									value={this.state.email.value}
									error={this.state.email.showError}
									onInput={this.handleEmailChange}
								/>
								<Form.Description error={this.state.email.showError}>
									{this.state.email.showError && this.state.email.error}
								</Form.Description>
							</Form.Item>
						)}

						{this.state.department && (
							<Form.Item>
								<Form.Label error={this.state.department.showError} htmlFor="department">I need help with...</Form.Label>
								<Form.SelectInput
									id="department"
									name="department"
									placeholder="Choose an option..."
									options={departments.map(({ _id, name }) => ({ value: _id, label: name }))}
									disabled={loading}
									value={this.state.department.value}
									error={this.state.department.showError}
									onInput={this.handleDepartmentChange}
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
