import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, number, object } from '@storybook/addon-knobs';
import { Messages } from '.';


const user = {
	_id: 1,
	avatar: {
		description: 'tasso.evangelista',
		src: '//gravatar.com/avatar/5ddcdc159b17f4f79fd254a06d871c5a?s=32',
	},
};

const agent = {
	_id: 2,
	avatar: {
		description: 'guilherme.gazzo',
		src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
	},
};

const messages = [
	{ _id: 1, u: { _id: 1 }, msg: 'Lorem ipsum dolor sit amet, ea usu quod eirmod lucilius, mea veri viris concludaturque id, vel eripuit fabulas ea' },
	{ _id: 2, u: { _id: 2 }, msg: 'Putent appareat te sea, dico recusabo pri te' },
	{ _id: 3, u: { _id: 2 }, msg: 'Iudico utinam volutpat eos eu, sadipscing repudiandae pro te' },
	{ _id: 4, u: { _id: 2 }, msg: 'Movet doming ad ius, mel id adversarium disputationi' },
	{ _id: 5, u: { _id: 1 }, msg: 'Adhuc latine et nec' },
	{ _id: 6, u: { _id: 2 }, msg: 'Vis at verterem adversarium concludaturque' },
	{ _id: 7, u: { _id: 2 }, msg: 'Sea no congue scripta persecuti, sed amet fabulas voluptaria ex' },
	{ _id: 8, u: { _id: 2 }, msg: 'Invidunt repudiandae has eu' },
	{ _id: 9, u: { _id: 1 }, msg: 'Veri soluta suscipit mel no' },
].map((message, i) => ({
	...message,
	ts: new Date(Date.now() - (15 - i) * 60000),
}));

const typingAvatars = [
	{
		description: 'guilherme.gazzo',
		src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
	},
];


storiesOf('Components|Messages', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Messages
			user={object('user', user)}
			agent={object('agent', agent)}
			messages={object('messages', messages)}
			typingAvatars={object('typingAvatars', [])}
			lastReadMessageId={number('lastReadMessageId', 8)}
		/>
	))
	.add('with typing user', () => (
		<Messages
			user={object('user', user)}
			agent={object('agent', agent)}
			messages={object('messages', messages)}
			lastReadMessageId={number('lastReadMessageId', 8)}
			typingAvatars={object('typingAvatars', typingAvatars)}
		/>
	))
;
