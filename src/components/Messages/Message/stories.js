import { loremIpsum } from 'lorem-ipsum';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, date, object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { attachmentResolver, avatarResolver } from '../../../helpers.stories';
import {
	MESSAGE_TYPE_ROOM_NAME_CHANGED,
	MESSAGE_TYPE_USER_ADDED,
	MESSAGE_TYPE_USER_REMOVED,
	MESSAGE_TYPE_USER_JOINED,
	MESSAGE_TYPE_USER_LEFT,
	MESSAGE_TYPE_WELCOME,
	MESSAGE_TYPE_LIVECHAT_CLOSED,
} from '../constants';
import { Message } from '.';


const messageTypes = {
	NULL: null,
	ROOM_NAME_CHANGED: MESSAGE_TYPE_ROOM_NAME_CHANGED,
	USER_ADDED: MESSAGE_TYPE_USER_ADDED,
	USER_REMOVED: MESSAGE_TYPE_USER_REMOVED,
	USER_JOINED: MESSAGE_TYPE_USER_JOINED,
	USER_LEFT: MESSAGE_TYPE_USER_LEFT,
	WELCOME: MESSAGE_TYPE_WELCOME,
	LIVECHAT_CLOSED: MESSAGE_TYPE_LIVECHAT_CLOSED,
};

const defaultMessage = loremIpsum({ count: 1, units: 'sentences' });
const defaultMessageExtra = loremIpsum({ count: 1, units: 'sentences' });

const defaultMarkdownMessage = `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

___

*This is bold text*

_This is italic text_

~~Strikethrough~~

+ Lorem ipsum dolor sit amet
+ Consectetur adipiscing elit
+ Integer molestie lorem at massa

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

\`rocket.chat();\`

https://rocket.chat
`;

const defaultUser = {
	username: 'guilherme.gazzo',
	name: 'Guilherme Albrech Gazzo',
};

const now = new Date();

storiesOf('Messages|Message', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
		/>
	))
	.add('system', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', '')}
			t={select('t', messageTypes, MESSAGE_TYPE_WELCOME)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
		/>
	))
	.add('me', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', true)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
		/>
	))
	.add('markdown', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMarkdownMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
		/>
	))
	.add('grouping', () => (
		<div>
			<Message
				attachmentResolver={attachmentResolver}
				avatarResolver={avatarResolver}
				me={boolean('me', false)}
				compact={boolean('compact', true)}
				msg={text('msg', defaultMessageExtra)}
				t={select('t', messageTypes, null)}
				u={object('u', defaultUser)}
				ts={date('ts', now)}
			/>
			<Message
				attachmentResolver={attachmentResolver}
				avatarResolver={avatarResolver}
				msg={defaultMessage}
				u={defaultUser}
				ts={now}
			/>
		</div>
	))
	.add('with quotation', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
			attachments={object('attachments', [{
				message_link: 'http://localhost:3000/live/SqouQyJ7wDsK8KPnc?msg=EWrxmazqYbEf3rFzd',
				text: defaultMessageExtra,
			}])}
		/>
	))
	.add('with audio attachment', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
			attachments={object('attachments', [{
				audio_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
			}])}
		/>
	))
	.add('with video attachment', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
			attachments={object('attachments', [{
				video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
			}])}
		/>
	))
	.add('with image attachment', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
			attachments={object('attachments', [{
				image_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
			}])}
		/>
	))
	.add('with files attachments', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
			attachments={object('attachments', ['pdf', 'doc', 'ppt', 'xls', 'zip', 'abc']
				.map((extension) => ({
					title_link: `http://localhost:3000/demo.${ extension }`,
					title: `Untitled ${ extension } file`,
				}))
			)}
		/>
	))
	.add('with mutiple attachments', () => (
		<Message
			attachmentResolver={attachmentResolver}
			avatarResolver={avatarResolver}
			me={boolean('me', false)}
			compact={boolean('compact', false)}
			msg={text('msg', defaultMessage)}
			t={select('t', messageTypes, null)}
			u={object('u', defaultUser)}
			ts={date('ts', now)}
			attachments={object('attachments', [
				{
					audio_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
				},
				{
					video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
				},
				{
					image_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
				},
				{
					title_link: 'http://localhost:3000/demo.pdf',
					title: 'Untitled pdf file',
				},
			])}
		/>
	));
