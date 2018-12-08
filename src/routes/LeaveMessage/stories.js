import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeaveMessage from './component';


const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px' }}>
		{storyFn()}
	</div>
));

storiesOf('Screen|Leave a message', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<LeaveMessage
			title={text('title', 'Leave a message')}
			color={color('color', '#666666')}
			message={text('message', 'We are not online right now. Please, leave a message.')}
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
			title={text('title', 'Leave a message')}
			color={color('color', '#666666')}
			message={text('message', 'We are not online right now. Please, leave a message.')}
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
