import { h, Component } from 'preact';

import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import {
	Form,
	FormField,
	TextInput,
	SelectInput,
	Validations,
} from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName, sortArrayByColumn } from '../../components/helpers';
import I18n from '../../i18n';
import styles from './styles.scss';

const defaultTitle = I18n.t('Need help?');
const defaultMessage = I18n.t('Please, tell us some information to start the chat');

const getDefaultDepartment = (departments = []) => (departments.length === 1 && departments[0]._id) || '';

const renderCustomFields = (customFields, { loading, handleFieldChange = () => {} }, state) => customFields.map(({ _id, required, label, type, options }) => {
	switch (type) {
		case 'input':
			return <FormField
				label={label}
				required={required}
				key={_id}
				error={state[_id].showError && state[_id].error}
			>
				<TextInput
					name={_id}
					placeholder={I18n.t('Insert your %{field} here...', { field: label })}
					value={state[_id].value}
					disabled={loading}
					onInput={handleFieldChange}
					custom
				/>
			</FormField>;
		case 'select':
			return <FormField
				label={label}
				required={required}
				key={_id}
				error={state[_id].showError && state[_id].error}
			>
				<SelectInput
					name={_id}
					value={state[_id].value}
					placeholder={I18n.t('Choose an option...')}
					options={options && options.map((option) => ({ value: option, label: option }))}
					disabled={loading}
					onInput={handleFieldChange}
					custom
				/>
			</FormField>;
	}
	return null;
});

const validations = {
	name: [Validations.nonEmpty],
	email: [Validations.nonEmpty, Validations.email],
	department: [],
};

const getCustomValidations = ({ customFields = [] }) =>
	customFields
		.map(({ _id, required, regexp }) => {
			const validations = [];

			if (required) {
				validations.push(Validations.nonEmpty);
			}

			if (regexp) {
				validations.push(Validations.custom);
			}

			return { [_id]: validations };
		})
		.reduce((values, entry) => ({ ...values, ...entry }), {});

const getValidableFields = (state) =>
	Object.keys(validations)
		.map((fieldName) => (state[fieldName] ? { fieldName, ...state[fieldName] } : null))
		.filter(Boolean);

const validate = (props, { name, value, regexp: pattern }) => {
	const validation = validations[name] || getCustomValidations(props)[name];
	return validation.reduce((error, validation) => error || validation({ value, pattern }), undefined);
};

const getDefaultState = (props) => {
	const { hasNameField, hasEmailField, hasDepartmentField, departments, customFields = [] } = props;

	let state = {
		...hasNameField && { name: { value: '' } },
		...hasEmailField && { email: { value: '' } },
		...hasDepartmentField && { department: { value: getDefaultDepartment(departments) } },
	};

	customFields.forEach(({ _id, defaultValue, options, regexp }) => {
		let value = '';
		if ((defaultValue && !options) || (Array.isArray(options) && options.includes(defaultValue))) {
			value = defaultValue;
		}

		state[_id] = {
			value,
			...regexp && { regexp },
		};
	});

	for (const { fieldName: name, value, regexp } of getValidableFields(state)) {
		const error = validate(props, { name, value, regexp });
		state = {
			...state,
			[name]: {
				...state[name],
				value,
				error,
				showError: false,
			},
		};
	}

	return state;
};

export default class Register extends Component {
	static getDerivedStateFromProps(nextProps, state) {
		const { hasNameField, hasEmailField, hasDepartmentField, departmentDefault, departments, nameDefault, emailDefault } = nextProps;

		const nameValue = nameDefault || '';
		if (hasNameField && (!state.name || state.name !== nameValue)) {
			state = { ...state, name: { ...state.name, value: nameValue } };
		} else if (!hasNameField) {
			state = { ...state, name: null };
		}

		const emailValue = emailDefault || '';
		if (hasEmailField && (!state.email || state.name !== emailValue)) {
			state = { ...state, email: { ...state.email, value: emailValue } };
		} else if (!hasEmailField) {
			state = { ...state, email: null };
		}

		const departmentValue = departmentDefault || getDefaultDepartment(departments);
		const showDepartmentField = hasDepartmentField && departments && departments.length > 1;
		if (showDepartmentField && (!state.department || state.department !== departmentValue)) {
			state = { ...state, department: { ...state.department, value: departmentValue } };
		} else if (!showDepartmentField) {
			state = { ...state, department: null };
		}

		for (const { fieldName: name, value, regexp } of getValidableFields(state)) {
			const error = validate(nextProps, { name, value, regexp });
			state = { ...state, [name]: { ...state[name], value, error, showError: false } };
		}
	}

	state = {
		name: null,
		email: null,
		department: null,
	}

	handleFieldChange = ({ target }) => {
		const { name, value } = target;
		const { regexp } = this.state[name];
		const error = validate(this.props, { name, value, regexp });
		this.setState({
			[name]: {
				...this.state[name],
				value,
				error,
				showError: true,
			},
		});
	}

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
		this.state = getDefaultState(props);
	}

	render({ title, color, message, loading, departments, customFields, ...props }, { name, email, department, ...state }) {
		const valid = getValidableFields(this.state).every(({ error } = {}) => !error);

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
						{name
							? (
								<FormField
									required
									label={I18n.t('Name')}
									error={name.showError && name.error}
								>
									<TextInput
										name='name'
										value={name.value}
										placeholder={I18n.t('Insert your %{field} here...', { field: I18n.t('Name') })}
										disabled={loading}
										onInput={this.handleFieldChange}
									/>
								</FormField>
							)
							: null}

						{email
							? (
								<FormField
									required
									label={I18n.t('Email')}
									error={email.showError && email.error}
								>
									<TextInput
										name='email'
										value={email.value}
										placeholder={I18n.t('Insert your %{field} here...', { field: I18n.t('Email') })}
										disabled={loading}
										onInput={this.handleFieldChange}
									/>
								</FormField>
							)
							: null}

						{department
							? (
								<FormField
									label={I18n.t('I need help with...')}
									error={department.showError && department.error}
								>
									<SelectInput
										name='department'
										value={department.value}
										options={sortArrayByColumn(departments, 'name').map(({ _id, name }) => ({ value: _id, label: name }))}
										placeholder={I18n.t('Choose an option...')}
										disabled={loading}
										onInput={this.handleFieldChange}
									/>
								</FormField>
							)
							: null}

						{customFields && renderCustomFields(customFields, { loading, handleFieldChange: this.handleFieldChange }, state)}

						<ButtonGroup>
							<Button submit loading={loading} disabled={!valid || loading} stack>{I18n.t('Start chat')}</Button>
						</ButtonGroup>
					</Form>
				</Screen.Content>
				<Screen.Footer />
			</Screen>
		);
	}
}
