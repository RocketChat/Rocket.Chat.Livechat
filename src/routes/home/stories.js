import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Chat from '.';
const data = [
	{ me: true, msg: 'Hello dido' },
	{ msg: 'Welcome to my channel' },
	{ msg: '???' },
	{ msg: 'Welcome to my channel' },
	{ msg: 'Welcome to my channel' },
	{ msg: 'Welcome to my channel' },
	{ msg: 'Welcome to my channel' },
	{ msg: 'Welcome to my channel' },
	{ me: true, msg: 'LARGE MESSAGE AAaasdkaskdlaskdl;kas;ldk;aslkd;aslkd;alsdk;alskd;al ;laskd;laskd;lask ;laskd;laskd;laskd;alk;sldk;alskd;aslkd;alskda;lskd;alskd;laskd;laskd;laks;dl' },
];
const Center = (storyFn) => (
	<div style="background: white; width: 100%; max-width: 350px; margin: auto; min-height: 300px; display: flex;">
		{storyFn()}
	</div>
);
storiesOf('Screen|Chat', module)
	.addDecorator(Center)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Chat user={{ _id: 1 }}messages={data} loading={boolean('loading', true)} uploads={boolean('uploads', true)} emoji={boolean('emoji', true)} title={text('text', 'guilherme.gazzo')}
			onSubmit={action('submit')}
		/>
	));
