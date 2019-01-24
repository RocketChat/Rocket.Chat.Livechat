import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered } from '../helpers.stories';
import SwitchDepartment from './component';


storiesOf('Routes|SwitchDepartment', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<SwitchDepartment
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Change Department')}
			message={text('message', 'Choose a department')}
			departments={object('departments', [
				{
					_id: 1,
					name: 'Department #1',
				},
				{
					_id: 2,
					name: 'Department #2',
				},
				{
					_id: 3,
					name: 'Department #3',
				},
			])}
			loading={boolean('loading', false)}
			onSubmit={action('submit')}
			onCancel={action('cancel')}
		/>
	))
	.add('loading', () => (
		<SwitchDepartment
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Change Department')}
			message={text('message', 'Choose a department')}
			departments={object('departments', [
				{
					_id: 1,
					name: 'Department #1',
				},
				{
					_id: 2,
					name: 'Department #2',
				},
				{
					_id: 3,
					name: 'Department #3',
				},
			])}
			loading={boolean('loading', true)}
			onSubmit={action('submit')}
			onCancel={action('cancel')}
		/>
	))
;
