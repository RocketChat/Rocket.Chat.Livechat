import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'RocketChat Livechat',
	url: 'https://github.com/RocketChat/Rocket.Chat.Livechat',
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
});

function loadStories() {
	addDecorator(withKnobs);
	require('../stories/index.js');
	const req = require.context('../src/components', true, /(story|stories)\.js$/);
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
