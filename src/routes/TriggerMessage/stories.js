import { action } from '@storybook/addon-actions';
import { withKnobs, color, text, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { screenCentered, screenProps } from '../../helpers.stories';
import TriggerMessage from './component';

// const agent = {
// 	name: 'Guilherme Gazzo',
// 	status: 'online',
// 	email: 'guilherme.gazzo@rocket.chat',
// 	phone: '+55 99 99999 9999',
// 	username: 'guilherme.gazzo',
// };

const now = new Date(Date.parse('2021-01-01T00:00:00.000Z'));

const messages = [
	{ _id: 1, u: { _id: 1, username: 'tasso.evangelista' }, msg: 'Hi there! 👋 Let us know if you have any questions.' },
	{ _id: 2, u: { _id: 1, username: 'tasso.evangelista' }, msg: 'Rocket.Chat allows you to chat and create better relationships with your customers on their favorite channels.' },
].map((message, i) => ({
	...message,
	ts: new Date(now.getTime() - (15 - i) * 60000 - (i < 5 ? 24 * 60 * 60 * 1000 : 0)).toISOString(),
}));

storiesOf('Routes/TriggerMessages', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<TriggerMessage
			theme={{
				color: color('theme/color', ''),
				fontColor: color('theme/fontColor', ''),
				iconColor: color('theme/iconColor', ''),
			}}
			messages={object('messages', messages)}
			title={text('title', '')}
			onSubmit={action('submit')}
			onCancel={action('cancel')}
			{...screenProps()}
		/>
	));
