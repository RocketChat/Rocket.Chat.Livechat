import { configure } from '@storybook/react';
import { setConsoleOptions } from '@storybook/addon-console';
import { setOptions } from '@storybook/addon-options';


setOptions({
  name: 'RocketChat Livechat',
	url: 'https://github.com/RocketChat/Rocket.Chat.Livechat',
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
});

setConsoleOptions({
	panelExclude: [],
});

function loadStories() {
	require('../src/styles/index.scss');
	const req = require.context('../src', true, /(stories|story)\.js$/);
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
