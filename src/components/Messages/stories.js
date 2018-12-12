import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, object } from '@storybook/addon-knobs';
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
		/>
	))
	.add('with typing user', () => (
		<Messages
			user={object('user', user)}
			agent={object('agent', agent)}
			messages={object('messages', messages)}
			typingAvatars={object('typingAvatars', typingAvatars)}
		/>
	))
;
