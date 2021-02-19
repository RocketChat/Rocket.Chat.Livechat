import { action } from '@storybook/addon-actions';
import { withKnobs, number, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { MessageList } from '.';
import { avatarResolver, loremIpsum, centered } from '../../../helpers.stories';


const fittingScreen = (storyFn, ...args) => centered(() => (
	<div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
		{storyFn()}
	</div>
), ...args);

const now = new Date(Date.parse('2021-01-01T00:00:00.000Z'));

const users = [
	{
		_id: 1,
		username: 'tasso.evangelista',
	},
	{
		_id: 2,
		username: 'guilherme.gazzo',
	},
	{
		_id: 3,
		username: 'martin.schoeler',
	},
];

const messages = new Array(10);
for (let i = 0; i < messages.length; ++i) {
	messages[i] = {
		_id: i + 1,
		u: users[i % users.length],
		msg: loremIpsum({ count: 1, units: 'sentences' }),
		ts: new Date(now.getTime() - (15 - i) * 60000).toISOString(),
	};
}

storiesOf('Messages/MessageList', module)
	.addDecorator(fittingScreen)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<MessageList
			messages={object('messages', messages)}
			uid={number('uid', 1)}
			avatarResolver={avatarResolver}
			lastReadMessageId={number('lastReadMessageId', 7)}
			typingUsernames={object('typingUsernames', [])}
			onScrollTo={action('scrollTo')}
		/>
	))
	.add('with typing users', () => (
		<MessageList
			messages={object('messages', messages)}
			uid={number('uid', 1)}
			avatarResolver={avatarResolver}
			lastReadMessageId={number('lastReadMessageId', 7)}
			typingUsernames={object('typingUsernames', [users[1].username, users[2].username])}
			onScrollTo={action('scrollTo')}
		/>
	));
