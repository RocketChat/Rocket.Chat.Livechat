import { h } from 'preact';
import { setOptions } from '@storybook/addon-options';
import '../src/style';

function importAll(r) {
	r.keys().forEach((key) => r(key));
}

setOptions({
	hierarchySeparator: '\\.',
});

importAll(require.context('../src', true, /story$/));
