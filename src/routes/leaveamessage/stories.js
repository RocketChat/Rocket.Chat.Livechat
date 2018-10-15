import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
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
		<LeaveMessage
			loading={boolean('loading', true)}
			title={I18n.t('Need help?')}
			onSubmit={action('submit')}
			minimize={action('minimize')}
			fullScreen={action('fullScreen')}
			notification={action('notification')}
			emailPlaceholder={I18n.t('insert your e-mail here...')}
			namePlaceholder={I18n.t('insert your name here...')}
			messsagePlaceholder={I18n.t('write your message...')}
		/>
	));
