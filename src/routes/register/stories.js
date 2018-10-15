import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Register from '.';

const Center = (storyFn) => (
	<div style="background: white; width: 100%; max-width: 350px; margin: auto; min-height: 300px; display: flex;">
		{storyFn()}
	</div>
);
storiesOf('Screen|Register', module)
	.addDecorator(Center)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Register title="Need help?" onSubmit={action('submit')} />
	));
