import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { boolean, color } from '@storybook/addon-knobs';
import { loremIpsum as originalLoremIpsum } from 'lorem-ipsum';
import { h } from 'preact';


export const screenCentered = (storyFn, ...args) => centered(() => (
	<div style={{ display: 'flex', width: '365px', height: '500px' }}>
		{storyFn()}
	</div>
), ...args);

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

export const avatarResolver = (username) => ({
	'tasso.evangelista': 'https://gravatar.com/avatar/5ddcdc159b17f4f79fd254a06d871c5a?s=32',
	'guilherme.gazzo': 'https://gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
	'martin.schoeler': 'https://gravatar.com/avatar/e6662ba16ba3ca2a76857e3999e6d960?s=32',
})[username];

export const attachmentResolver = (url) => url;

const createRandom = (s) => () => {
	s = Math.sin(s) * 10000;
	return s - Math.floor(s);
};
const loremIpsumRandom = createRandom(42);
export const loremIpsum = (options) => originalLoremIpsum({ random: loremIpsumRandom, ...options });
