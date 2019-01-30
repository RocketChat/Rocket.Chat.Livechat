import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered } from '../helpers.stories';
import LeaveMessage from './component';


storiesOf('Routes|Leave a message', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<LeaveMessage
			theme={{
				color: color('theme.color', '#666666'),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', '')}
			message={text('message', '')}
			unavailableMessage={text('unavailableMessage', '')}
			hasForm={boolean('hasForm', true)}
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
	.add('unavailable', () => (
		<LeaveMessage
			theme={{
				color: color('theme.color', '#666666'),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', '')}
			message={text('message', '')}
			unavailableMessage={text('unavailableMessage', '')}
			hasForm={boolean('hasForm', false)}
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
		<LeaveMessage
			theme={{
				color: color('theme.color', '#666666'),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			message={text('message', '')}
			unavailableMessage={text('unavailableMessage', '')}
			hasForm={boolean('hasForm', false)}
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
;
