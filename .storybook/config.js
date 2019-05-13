import { addDecorator, configure, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withOptions } from '@storybook/addon-options';
import { create } from '@storybook/theming';
import 'loki/configure-react'

addParameters({
	options: {
		theme: create({
			base: 'dark',
			brandTitle: 'Rocket.Chat Livechat',
			brandImage: 'https://rocket.chat/images/default/logo--dark.svg',
			brandUrl: 'https://github.com/RocketChat/Rocket.Chat.Livechat',
		}),
		hierarchySeparator: /\//,
		hierarchyRootSeparator: /\|/,
	},
	backgrounds: [
		{
			name: 'white',
			value: 'white',
			default: true,
		},
	],
});

addDecorator(withA11y);

function loadStories() {
	require('../src/styles/index.scss');
	const req = require.context('../src', true, /(stories|story)\.js$/);
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
