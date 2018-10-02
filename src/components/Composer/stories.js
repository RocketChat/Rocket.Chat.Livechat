import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Composer from '.';

storiesOf('Components|Composer', module)
	.addDecorator((storyFn) => (
		<div style={{ display: 'flex', justifyContent: 'stretch', width: '350px' }}>
			{storyFn()}
		</div>
	))
	.addDecorator(withKnobs)
	.addDecorator(centered)
	.add('static', () => (
		<Composer placeholder={text('placeholder', 'insert your text here')} onInput={action('input')} />
	));
