import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, number, object } from '@storybook/addon-knobs';
import { avatarResolver } from '../../helpers.stories';
import { Messages } from '.';


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
	ts: new Date(Date.now() - (15 - i) * 60000),
}));


storiesOf('Components|Messages', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Messages
			avatarResolver={avatarResolver}
			uid={number('uid', 1)}
			messages={object('messages', messages)}
			lastReadMessageId={number('lastReadMessageId', 8)}
			typingUsernames={object('typingUsernames', [])}
		/>
	))
	.add('with typing user', () => (
		<Messages
			avatarResolver={avatarResolver}
			uid={number('uid', 1)}
			messages={object('messages', messages)}
			lastReadMessageId={number('lastReadMessageId', 8)}
			typingUsernames={object('typingUsernames', ['guilherme.gazzo'])}
		/>
	))
;
