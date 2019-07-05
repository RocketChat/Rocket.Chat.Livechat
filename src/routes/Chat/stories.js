import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number, object, text } from '@storybook/addon-knobs';

import { screenCentered, screenProps, avatarResolver } from '../../helpers.stories';
import Chat from './component';


const agent = {
	name: 'Guilherme Gazzo',
	status: 'online',
	email: 'guilherme.gazzo@rocket.chat',
	phone: '+55 99 99999 9999',
	username: 'guilherme.gazzo',
};

const messages = [
	{ _id: 1, u: { _id: 1, username: 'tasso.evangelista' }, msg: 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea' },
	{ _id: 2, u: { _id: 2, username: 'guilherme.gazzo' }, msg: 'Putent appareat te sea, dico recusabo pri te' },
	{ _id: 3, u: { _id: 2, username: 'guilherme.gazzo' }, msg: 'Iudico utinam volutpat eos eu, sadipscing repudiandae pro te' },
	{ _id: 4, u: { _id: 2, username: 'guilherme.gazzo' }, msg: 'Movet doming ad ius, mel id adversarium disputationi' },
	{ _id: 5, u: { _id: 1, username: 'tasso.evangelista' }, msg: 'Adhuc latine et nec' },
	{ _id: 6, u: { _id: 2, username: 'guilherme.gazzo' }, msg: 'Vis at verterem adversarium concludaturque' },
	{ _id: 7, u: { _id: 2, username: 'guilherme.gazzo' }, msg: 'Sea no congue scripta persecuti, sed amet fabulas voluptaria ex' },
	{ _id: 8, u: { _id: 2, username: 'guilherme.gazzo' }, msg: 'Invidunt repudiandae has eu' },
	{ _id: 9, u: { _id: 1, username: 'tasso.evangelista' }, msg: 'Veri soluta suscipit mel no' },
].map((message, i) => ({
	...message,
	ts: new Date(Date.now() - (15 - i) * 60000 - (i < 5 ? 24 * 60 * 60 * 1000 : 0)),
}));

const soundSrc = 'https://open.rocket.chat/sounds/beep.mp3';


storiesOf('Routes|Chat', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('loading', () => (
		<Chat
			title={text('title', '')}
			sound={{ src: soundSrc, play: false }}
			avatarResolver={avatarResolver}
			uid={number('uid', 1)}
			agent={object('agent', agent)}
			messages={object('messages', [])}
			typingUsernames={object('typingUsernames', [])}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			loading={boolean('loading', true)}
			onTop={action('top')}
			onBottom={action('bottom')}
			onUpload={action('upload')}
			onSubmit={action('submit')}
			{...screenProps()}
		/>
	))
	.add('normal', () => (
		<Chat
			title={text('title', '')}
			sound={{ src: soundSrc, play: false }}
			avatarResolver={avatarResolver}
			uid={number('uid', 1)}
			agent={object('agent', agent)}
			messages={object('messages', messages)}
			typingUsernames={object('typingUsernames', [])}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			loading={boolean('loading', false)}
			lastReadMessageId={number('lastReadMessageId', 8)}
			onTop={action('top')}
			onBottom={action('bottom')}
			onUpload={action('upload')}
			onSubmit={action('submit')}
			{...screenProps()}
		/>
	))
	.add('with typing user', () => (
		<Chat
			title={text('title', '')}
			sound={{ src: soundSrc, play: false }}
			avatarResolver={avatarResolver}
			uid={number('uid', 1)}
			agent={object('agent', agent)}
			messages={object('messages', messages)}
			typingUsernames={object('typingUsernames', ['guilherme.gazzo'])}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			loading={boolean('loading', false)}
			lastReadMessageId={number('lastReadMessageId', 8)}
			onTop={action('top')}
			onBottom={action('bottom')}
			onUpload={action('upload')}
			onSubmit={action('submit')}
			{...screenProps()}
		/>
	));
