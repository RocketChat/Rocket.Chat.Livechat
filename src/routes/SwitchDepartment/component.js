import { Component } from 'preact';
import Button from '../../components/Button';
import Form, { Validations } from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';


const defaultTitle = I18n.t('Change Department');
const defaultMessage = I18n.t('Choose a department');

export default class SwitchDepartment extends Component {
	state = {
		department: null,
	}

	validations = {
		department: [Validations.nonEmpty],
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

	handleCancelClick = () => {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}

	constructor(props) {
		super(props);

		const { departments } = props;
		if (departments && departments.length > 0) {
			this.state.department = { value: '' };
		}

		this.validateAll();
	}

	componentWillReceiveProps() {
		if (!this.state.department) {
			this.setState({ department: { ...this.state.department, value: '' } });
		}
	}

	render({ title, color, message, loading, departments, ...props }, { department }) {
		const valid = this.isValid();
		return (
			<Screen
				color={color}
				title={title || defaultTitle}
				className={createClassName(styles, 'switch-department')}
				{...props}
			>
				<Screen.Content>
					<p className={createClassName(styles, 'switch-department__message')}>{message || defaultMessage}</p>

					<Form onSubmit={this.handleSubmit}>
						<Form.Item>
							<Form.Label error={department && department.showError} htmlFor="department">
								{I18n.t('Departments')}
							</Form.Label>
							<Form.SelectInput
								id="department"
								name="department"
								placeholder={I18n.t('Choose a department...')}
								options={departments.map(({ _id, name }) => ({ value: _id, label: name }))}
								disabled={loading}
								value={department && department.value}
								error={department && department.showError}
								onInput={this.handleDepartmentChange}
							/>
							<Form.Description error={department && department.showError}>
								{department && department.showError && department.error}
							</Form.Description>
						</Form.Item>
						<Form.Item>
							<Button loading={loading} disabled={!valid || loading} stack>{I18n.t('Start chat')}</Button>
							<Button disabled={loading} stack secondary nude onClick={this.handleCancelClick}>{I18n.t('Cancel')}</Button>
						</Form.Item>
					</Form>
				</Screen.Content>
				<Screen.Footer />
			</Screen>
		);
	}
}
