import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, object, text } from '@storybook/addon-knobs';
import { screenCentered } from '../helpers.stories';
import Chat from './component';
import soundSrc from '../../components/Sound/chime.mp3';


const user = {
	_id: 1,
	name: 'Tasso Evangelista',
	status: 'online',
	email: 'tasso.evangelista@rocket.chat',
	username: 'tasso.evangelista',
	avatar: {
		description: 'tasso.evangelista',
		src: '//gravatar.com/avatar/5ddcdc159b17f4f79fd254a06d871c5a?s=32',
	},
};

const agent = {
	_id: 2,
	name: 'Guilherme Gazzo',
	status: 'online',
	email: 'guilherme.gazzo@rocket.chat',
	username: 'guilherme.gazzo',
	avatar: {
		description: 'guilherme.gazzo',
		src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
	},
};

const messages = [
	{ u: { _id: 1 }, msg: 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea' },
	{ u: { _id: 2 }, msg: 'Putent appareat te sea, dico recusabo pri te' },
	{ u: { _id: 2 }, msg: 'Iudico utinam volutpat eos eu, sadipscing repudiandae pro te' },
	{ u: { _id: 2 }, msg: 'Movet doming ad ius, mel id adversarium disputationi' },
	{ u: { _id: 1 }, msg: 'Adhuc latine et nec' },
	{ u: { _id: 2 }, msg: 'Vis at verterem adversarium concludaturque' },
	{ u: { _id: 2 }, msg: 'Sea no congue scripta persecuti, sed amet fabulas voluptaria ex' },
	{ u: { _id: 2 }, msg: 'Invidunt repudiandae has eu' },
	{ u: { _id: 1 }, msg: 'Veri soluta suscipit mel no' },
].map((message, i) => ({
	...message,
	ts: new Date(Date.now() - (15 - i) * 60000 - (i < 5 ? 24 * 60 * 60 * 1000 : 0)),
}));


storiesOf('Routes|Chat', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('loading', () => (
		<Chat
			color={color('color', '#175CC4')}
			title={text('title', '')}
			sound={{ src: soundSrc, play: false }}
			user={object('user', user)}
			agent={object('agent', agent)}
			messages={object('messages', [])}
			typingAvatars={object('typingAvatars', [])}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			loading={boolean('loading', true)}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
			onTop={action('top')}
			onBottom={action('bottom')}
			onUpload={action('upload')}
			onSubmit={action('submit')}
		/>
	))
	.add('normal', () => (
		<Chat
			color={color('color', '#175CC4')}
			title={text('title', '')}
			sound={{ src: soundSrc, play: false }}
			user={object('user', user)}
			agent={object('agent', agent)}
			messages={object('messages', messages)}
			typingAvatars={object('typingAvatars', [])}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			loading={boolean('loading', false)}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
			onTop={action('top')}
			onBottom={action('bottom')}
			onUpload={action('upload')}
			onSubmit={action('submit')}
		/>
	))
	.add('with typing user', () => (
		<Chat
			color={color('color', '#175CC4')}
			title={text('title', '')}
			sound={{ src: soundSrc, play: false }}
			user={object('user', user)}
			agent={object('agent', agent)}
			messages={object('messages', messages)}
			typingAvatars={object('typingAvatars', [
				{
					description: 'guilherme.gazzo',
					src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
				},
			])}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			loading={boolean('loading', false)}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
			onTop={action('top')}
			onBottom={action('bottom')}
			onUpload={action('upload')}
			onSubmit={action('submit')}
		/>
	))
;
