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
storiesOf('Screen|Chat', module)
	.addDecorator(Center)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Register loading={boolean('loading', true)} uploads={boolean('uploads', true)} emoji={boolean('emoji', true)} title={text('text', 'guilherme.gazzo')} onSubmit={action('submit')} />
	));
