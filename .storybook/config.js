import { addDecorator, configure } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { setConsoleOptions } from '@storybook/addon-console';
import { withOptions } from '@storybook/addon-options';


addDecorator(withOptions({
  name: 'RocketChat Livechat',
	url: 'https://github.com/RocketChat/Rocket.Chat.Livechat',
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
}));

addDecorator(checkA11y);

setConsoleOptions({
	panelExclude: [],
});

function loadStories() {
	require('../src/styles/index.scss');
	const req = require.context('../src', true, /(stories|story)\.js$/);
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
