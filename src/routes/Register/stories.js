import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered } from '../helpers.stories';
import Register from './component';


storiesOf('Routes|Register', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Register
			title={text('title', 'Need help?')}
			color={color('color', '#C1272D')}
			message={text('message', 'Please, tell us some informations to start the chat')}
			hasNameField={boolean('hasNameField', true)}
			hasEmailField={boolean('hasEmailField', true)}
			hasDepartmentField={boolean('hasDepartmentField', true)}
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
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
			onSubmit={action('submit')}
		/>
	))
	.add('loading', () => (
		<Register
			title={text('title', 'Need help?')}
			color={color('color', '#C1272D')}
			message={text('message', 'Please, tell us some informations to start the chat')}
			hasNameField={boolean('hasNameField', true)}
			hasEmailField={boolean('hasEmailField', true)}
			hasDepartmentField={boolean('hasDepartmentField', true)}
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
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
			onSubmit={action('submit')}
		/>
	))
;
