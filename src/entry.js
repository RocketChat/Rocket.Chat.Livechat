import { h, render } from 'preact';

import * as AppImport from './index';

let root = document.getElementById('app') || document.body.firstElementChild;

const init = async () => {
	const { default: App } = AppImport;
	root = render(h(App), document.body, root);
};

if (module.hot) {
	module.hot.accept('./index', init);
}

init();
