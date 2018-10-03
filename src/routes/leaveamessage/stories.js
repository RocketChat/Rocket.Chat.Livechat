import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import LeaveMessage from '.';

const Center = (storyFn) => (
	<div style="background: white; width: 100%; max-width: 350px; margin: auto; min-height: 300px; display: flex;">
		{storyFn()}
	</div>
);
storiesOf('Screen|Leave a message', module)
	.addDecorator(Center)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<LeaveMessage loading={boolean('loading', true)} title="Leave a message" onSubmit={action('submit')} minimize={action('minimize')} fullScreen={action('fullScreen')} notification={action('notification')} />
	));
