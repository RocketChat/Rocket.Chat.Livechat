import { h } from 'preact';

import I18n from '../../i18n';
import { createClassName, MemoizedComponent } from '../helpers';
import styles from './styles.scss';


export class Form extends MemoizedComponent {
	static defaultHandleSubmit = (event) => {
		event.preventDefault();
	}

	render = ({ onSubmit, className, style = {}, children }) => (
		<form
			noValidate
			onSubmit={onSubmit || Form.defaultHandleSubmit}
			className={createClassName(styles, 'form', {}, [className])}
			style={style}
		>
			{children}
		</form>
	)
}

export const Validations = {
	nonEmpty: ({ value }) => (!value ? I18n.t('Field required') : undefined),

	email: ({ value }) => (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(String(value).toLowerCase()) ? I18n.t('Invalid email') : null),

	custom: ({ value, pattern }) => (new RegExp(pattern, 'i').test(String(value)) ? null : I18n.t('Invalid value')),
};


export { FormField } from './FormField';
export { TextInput } from './TextInput';
export { PasswordInput } from './PasswordInput';
export { SelectInput } from './SelectInput';
