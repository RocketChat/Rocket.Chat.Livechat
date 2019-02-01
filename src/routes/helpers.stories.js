import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { boolean, color } from '@storybook/addon-knobs';


export const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px', height: '500px' }}>
		{storyFn()}
	</div>
));

export const screenProps = () => ({
	theme: {
		color: color('theme.color', ''),
		fontColor: color('theme.fontColor', ''),
		iconColor: color('theme.iconColor', ''),
	},
	notificationsEnabled: boolean('notificationsEnabled', true),
	minimized: boolean('minimized', false),
	windowed: boolean('windowed', false),
	onEnableNotifications: action('enableNotifications'),
	onDisableNotifications: action('disableNotifications'),
	onMinimize: action('minimize'),
	onRestore: action('restore'),
	onOpenWindow: action('openWindow'),
});
