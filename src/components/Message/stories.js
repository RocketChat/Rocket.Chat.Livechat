import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, date, object, text } from '@storybook/addon-knobs';
import { avatarResolver } from '../../helpers.stories';
import Message from '.';


const now = new Date();

const markdownExampleMessage = `
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

storiesOf('Components|Message', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Message
			me={boolean('me', false)}
			group={boolean('group', false)}
			msg={text('msg', 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea')}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
		/>
	))
	.add('me', () => (
		<Message
			me={boolean('me', true)}
			group={boolean('group', false)}
			msg={text('msg', 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea')}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
		/>
	))
	.add('markdown', () => (
		<Message
			me={boolean('me', false)}
			group={boolean('group', false)}
			msg={text('msg', markdownExampleMessage)}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
		/>
	))
	.add('grouping', () => (
		<div>
			<Message
				me={boolean('me #1', false)}
				group={boolean('group #1', true)}
				msg={text('msg #1', 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea')}
				ts={date('ts #1', now)}
				u={{
					username: text('u.username #1', 'guilherme.gazzo'),
					name: text('u.name #1', 'Guilherme Albrech Gazzo'),
				}}
				avatarResolver={avatarResolver}
			/>
			<Message
				me={boolean('me #2', false)}
				group={boolean('group #2', false)}
				msg={text('msg #2', 'Putent appareat te sea, dico recusabo pri te')}
				ts={date('ts #2', now)}
				u={{
					username: text('u.username #2', 'guilherme.gazzo'),
					name: text('u.name #2', 'Guilherme Albrech Gazzo'),
				}}
				avatarResolver={avatarResolver}
			/>
		</div>
	))
;

storiesOf('Components|Message/Attachments', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('image', () => (
		<Message
			me={boolean('me', false)}
			msg={text('msg', '')}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
			attachmentsUrl={object('attachmentsUrl', [{
				attachment_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
				image_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
			}])}
		/>
	))
	.add('audio', () => (
		<Message
			me={boolean('me', false)}
			msg={text('msg', '')}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
			attachmentsUrl={object('attachmentsUrl', [{
				attachment_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
				audio_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
			}])}
		/>
	))
	.add('video', () => (
		<Message
			me={boolean('me', false)}
			msg={text('msg', '')}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
			attachmentsUrl={object('attachmentsUrl', [{
				attachment_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
				video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
			}])}
		/>
	))
	.add('no preview', () => (
		<div>
			{['pdf', 'doc', 'ppt', 'xls', 'zip', 'abc'].map((extension, key) => (
				<Message
					key={key}
					me={boolean('me', false)}
					msg={text('msg', '')}
					ts={date('ts', now)}
					u={{
						username: text('u.username', 'guilherme.gazzo'),
						name: text('u.name', 'Guilherme Albrech Gazzo'),
					}}
					avatarResolver={avatarResolver}
					attachmentsUrl={object(`attachmentsUrl #${ key }`, [{
						attachment_url: `http://localhost:3000/demo.${ extension }`,
						title: 'attachment',
					}])}
				/>
			))}
		</div>
	))
	.add('long attachment title', () => (
		<Message
			me={boolean('me', false)}
			msg={text('msg', '')}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
			attachmentsUrl={object('attachmentsUrl', [{
				attachment_url: 'http://localhost:3000/demo.pdf',
				title: 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea',
			}])}
		/>
	))
	.add('multiple attachments', () => (
		<Message
			me={boolean('me', false)}
			msg={text('msg', '')}
			ts={date('ts', now)}
			u={{
				username: text('u.username', 'guilherme.gazzo'),
				name: text('u.name', 'Guilherme Albrech Gazzo'),
			}}
			avatarResolver={avatarResolver}
			attachmentsUrl={object('attachmentsUrl', [
				{
					attachment_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
					image_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
				}, {
					attachment_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
					audio_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
				}, {
					attachment_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
					video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
				}, {
					attachment_url: 'http://localhost:3000/demo.pdf',
					title: 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea',
				},
			])}
		/>
	));
