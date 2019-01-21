import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import Separator from '.';
import Message from '../Message';

storiesOf('Components|Separator', module)
	.addDecorator(centered)
	.add('date', () => (
		<div style={{ width: '350px' }}>
			<Separator date={new Date('01/01/2019')} />
		</div>
	))
	.add('unread', () => (
		<div style={{ width: '350px' }}>
			<Separator unread />
		</div>
	))
	.add('date and unread', () => (
		<div style={{ width: '350px' }}>
			<Separator date={new Date('01/01/2019')} />
			<Separator unread />
		</div>
	))
	.add('with surrounding messages', () => (
		<div style={{ width: '350px' }}>
			<Message Element="div" {...{
				_id: '9NSuEkEttArE2Ny6Q',
				rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
				msg: 'Could you send me a print screen? http://open.rocket.chat/logo.png',
				ts: new Date(),
				u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
				_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
			}}
			>Hey</Message>
			<Separator unread />
			<Message me Element="div" {...{
				_id: '9NSuEkEttArE2Ny6Q',
				rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
				msg: 'Could you send me a print screen? http://open.rocket.chat/logo.png',
				ts: new Date(),
				u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
				_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
			}}
			>Hey</Message>
		</div>
	));
