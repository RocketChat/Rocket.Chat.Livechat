import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Chat from '.';
const data = [
	{ u: { _id: 1 }, ts: new Date(), msg: 'Hello dido' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Welcome to my channel' },
	{ u: { _id: 2 }, ts: new Date(), msg: '???' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Welcome to my channel' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Welcome to my channel' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Welcome to my channel' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Welcome to my channel' },
	{ u: { _id: 2 }, ts: new Date(), msg: 'Welcome to my channel' },
	{ u: { _id: 1 }, ts: new Date(), msg: 'LARGE MESSAGE AAaasdkaskdlaskdl;kas;ldk;aslkd;aslkd;alsdk;alskd;al ;laskd;laskd;lask ;laskd;laskd;laskd;alk;sldk;alskd;aslkd;alskda;lskd;alskd;laskd;laskd;laks;dl' },
];
const Center = (storyFn) => (
	<div style="background: white; width: 100%; max-width: 350px; margin: auto; height: 500px; display: flex;">
		{storyFn()}
	</div>
);
storiesOf('Screen|Chat', module)
	.addDecorator(Center)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Chat onUpload={action('upload')} user={{ _id: 1 }} messages={data} loading={boolean('loading', true)} uploads={boolean('uploads', true)} emoji={boolean('emoji', true)}
			title={text('text', 'guilherme.gazzo')}
			onSubmit={action('submit')}
		/>
	));
