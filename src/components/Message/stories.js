import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs } from '@storybook/addon-knobs';
import Message from '.';


storiesOf('Components|Message', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
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
		</div>
	))
	.add('me', () => (
		<div>
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
	))
	.add('markdown', () => (
		<div>
			<Message me Element="div" {...{
				_id: '9NSuEkEttArE2Ny6Q',
				rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
				msg: '# Could you send me a print screen? http://open.rocket.chat/logo.png',
				ts: new Date(),
				u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
				_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
			}}
			>Hey</Message>
		</div>
	))
	.add('bold', () => (
		<div>
			<Message me Element="div" {...{
				_id: '9NSuEkEttArE2Ny6Q',
				rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
				msg: 'Could you send me a print *screen*?',
				ts: new Date(),
				u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
				_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
			}}
			>Hey</Message>
		</div>
	));

storiesOf('Components|Message/Attachments', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('image', () => (
		<div>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
						image_url: 'https://sample-videos.com/img/Sample-png-image-200kb.png',
					}],
				}}
			/>
		</div>
	))
	.add('audio', () => (
		<div>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
						audio_url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
					}],
				}}
			/>
		</div>
	))
	.add('video', () => (
		<div>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
						video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
					}],
				}}
			/>
		</div>
	))
	.add('no preview', () => (
		<div style={{ backgroundColor: '#fff', width: 350, padding: 10 }}>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'http://localhost:3000/demo.pdf',
						title: 'attachment',
					}],
				}}
			/>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'http://localhost:3000/demo.doc',
						title: 'attachment',
					}],
				}}
			/>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'http://localhost:3000/demo.ppt',
						title: 'attachment',
					}],
				}}
			/>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'http://localhost:3000/demo.xls',
						title: 'attachment',
					}],
				}}
			/>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'http://localhost:3000/demo.zip',
						title: 'attachment',
					}],
				}}
			/>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'http://localhost:3000/demo.abc',
						title: 'attachment',
					}],
				}}
			/>
		</div>
	))
	.add('no preview with long attachment name', () => (
		<div style={{ backgroundColor: '#fff', width: 350, padding: 10 }}>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
						attachment_url: 'http://localhost:3000/demo.pdf',
						title: 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea',
					}],
				}}
			/>
		</div>
	))
	.add('multiple attachments on one message', () => (
		<div style={{ backgroundColor: '#fff', width: 350, padding: 10 }}>
			<Message me Element="div"
				{...{
					_id: '9NSuEkEttArE2Ny6Q',
					rid: 'oQAGfG32u3uGptekbyhHvK7uhhXh9DqKWH',
					ts: new Date(),
					u: { _id: 'oQAGfG32u3uGptekb', username: 'guilherme.gazzo', name: 'Guilherme Albrecht Gazzo' },
					_updatedAt: new Date(), editedBy: null, editedAt: null, emoji: null, avatar: null, alias: null, customFields: null, groupable: null, attachments: null, reactions: null, mentions: [], channels: [],
					attachmentsUrl: [{
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
					}],
				}}
			/>
		</div>
	));
