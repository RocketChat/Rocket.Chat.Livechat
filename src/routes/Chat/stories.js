import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, color, object, text } from '@storybook/addon-knobs';
import Chat from './component';
import soundSrc from '../../components/Sound/chime.mp3';


const data = [
	{ u: { _id: 1 }, ts: new Date(), msg: 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Putent appareat te sea, dico recusabo pri te' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Iudico utinam volutpat eos eu, sadipscing repudiandae pro te' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Movet doming ad ius, mel id adversarium disputationi' },
	{ u: { _id: 1 }, ts: new Date(), msg: 'Adhuc latine et nec' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Vis at verterem adversarium concludaturque' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Sea no congue scripta persecuti, sed amet fabulas voluptaria ex' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Invidunt repudiandae has eu' },
	{ u: { _id: 1 }, ts: new Date(), msg: 'Veri soluta suscipit mel no' },
];

const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px', height: '500px' }}>
		{storyFn()}
	</div>
));

storiesOf('Screen|Chat', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('loading', () => (
		<Chat
			color={color('color', '#175CC4')}
			title={text('title', '')}
			agent={object('agent', {
				name: 'Guilherme Gazzo',
				status: 'online',
				email: 'guilherme.gazzo@rocket.chat',
				username: '@guilherme.gazzo',
				avatarSrc: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
			})}
			sound={{
				src: soundSrc,
				play: false,
			}}
			user={object('user', { _id: 1 })}
			messages={object('messages', [])}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			typingUsers={object('typingUsers', [])}
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
			agent={object('agent', {
				name: 'Guilherme Gazzo',
				status: 'online',
				email: 'guilherme.gazzo@rocket.chat',
				username: '@guilherme.gazzo',
				avatarSrc: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
			})}
			sound={{
				src: soundSrc,
				play: false,
			}}
			user={object('user', { _id: 1 })}
			messages={object('messages', data)}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			typingUsers={object('typingUsers', [])}
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
			agent={object('agent', {
				name: 'Guilherme Gazzo',
				status: 'online',
				email: 'guilherme.gazzo@rocket.chat',
				username: '@guilherme.gazzo',
				avatarSrc: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
			})}
			sound={{
				src: soundSrc,
				play: false,
			}}
			user={{ _id: 1 }}
			messages={data}
			emoji={boolean('emoji', false)}
			uploads={boolean('uploads', false)}
			typingUsers={object('typingUsers', ['user'])}
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
