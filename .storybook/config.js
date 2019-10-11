import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { create } from '@storybook/theming';


addParameters({
	options: {
		theme: create({
			base: 'light',
			brandTitle: 'Rocket.Chat Livechat',
			brandImage: 'https://rocket.chat/images/default/logo--dark.svg',
			brandUrl: 'https://github.com/RocketChat/Rocket.Chat.Livechat',
		}),
		hierarchySeparator: /\//,
		hierarchyRootSeparator: /\|/,
	},
});

addDecorator(withA11y);

configure(() => {
	require('../src/styles/index.scss');
	const componentStories = require.context('../src', true, /(stories|story)\.js$/);
	return componentStories
		.keys()
		.map(componentStories)
		.filter((module) => module.default && module.default.title);
}, module);
