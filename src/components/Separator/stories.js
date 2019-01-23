import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, date } from '@storybook/addon-knobs';
import Separator from '.';
import Message from '../Message';


const centeredWithWidth = (storyFn) => centered(() => (
	<div style={{ width: '365px' }}>
		{storyFn()}
	</div>
));

const now = new Date();

storiesOf('Components|Separator', module)
	.addDecorator(centeredWithWidth)
	.addDecorator(withKnobs)
	.add('date', () => (
		<Separator
			date={date('date', now)}
			unread={boolean('unread', false)}
		/>
	))
	.add('unread', () => (
		<Separator
			date={date('date', null)}
			unread={boolean('unread', true)}
		/>
	))
	.add('date and unread', () => (
		<div>
			<Separator date={date('date', now)} />
			<Separator unread={boolean('unread', true)} />
		</div>
	))
	.add('with surrounding messages', () => (
		<div>
			<Message Element="div" {...{
				_id: '9NSuEkEttArE2Ny6Q',
				rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
				msg: 'Could you send me a print screen? http://open.rocket.chat/logo.png',
				ts: new Date(),
				u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
				_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
			}}
			>Hey</Message>
			<Separator
				date={date('date', null)}
				unread={boolean('unread', true)}
			/>
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
