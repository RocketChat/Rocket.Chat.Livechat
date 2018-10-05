import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Message from '.';
const message = {
	_id: '9NSuEkEttArE2Ny6Q',
	rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
	msg: 'Could you send me a print screen?',
	ts: new Date(),
	u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
	_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [] };

storiesOf('Components|Message', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<div>
			<Message Element="div" {...message}>Hey</Message>
		</div>
	))
	.add('me', () => (
		<div>
			<Message me Element="div" {...message}>Hey</Message>
		</div>
	));
