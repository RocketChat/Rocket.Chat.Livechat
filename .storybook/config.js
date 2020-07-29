import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

addParameters({
	options: {
		theme: create({
			base: 'light',
			brandTitle: 'Rocket.Chat Livechat',
			brandImage: 'https://rocket.chat/wp-content/uploads/2020/04/logo-dark.svg',
			brandUrl: 'https://github.com/RocketChat/Rocket.Chat.Livechat',
		}),
		hierarchySeparator: /\//,
		hierarchyRootSeparator: /\|/,
	},
});

configure(() => {
	require('../src/styles/index.scss');
	const componentStories = require.context('../src', true, /(stories|story)\.js$/);
	return componentStories
		.keys()
		.map(componentStories)
		.filter((module) => module.default && module.default.title);
}, module);
