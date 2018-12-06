import { Component } from 'preact';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Form, Validations } from '../../components/Form';
import { createClassName } from '../../components/helpers';
import Bell from '../../icons/bell.svg';
import Arrow from '../../icons/arrowDown.svg';
import NewWindow from '../../icons/newWindow.svg';
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

	render() {
		const { color, title, message, loading } = this.props;
		const valid = this.isValid();

		return (
			<div className={createClassName(styles, 'leave-message')}>
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

				<main className={createClassName(styles, 'leave-message__main')}>
					<p className={createClassName(styles, 'leave-message__main-message')}>{message}</p>

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
									placeholder="Insert your email here..."
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

						{this.state.message && (
							<Form.Item>
								<Form.Label error={this.state.message.showError} htmlFor="message">Message *</Form.Label>
								<Form.TextInput
									id="message"
									name="message"
									placeholder="Write your message..."
									multiple={4}
									disabled={loading}
									value={this.state.message.value}
									error={this.state.message.showError}
									onInput={this.handleMessageChange}
								/>
								<Form.Description error={this.state.message.showError}>
									{this.state.message.showError && this.state.message.error}
								</Form.Description>
							</Form.Item>
						)}

						<Form.Item>
							<Button loading={loading} disabled={!valid || loading} stack>Send</Button>
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
