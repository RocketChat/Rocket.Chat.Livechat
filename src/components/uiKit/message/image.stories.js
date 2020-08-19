import { h } from 'preact';

import { renderMessageBlocks } from '.';

export default {
	title: 'UiKit/Message/Image block',
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(storyFn) => <div children={storyFn()} style={{ width: '100vw', maxWidth: 500 }} />,
	],
};

export const WithTitle = () =>
	renderMessageBlocks([
		{
			type: 'image',
			title: {
				type: 'plain_text',
				text: 'I Need a Marg',
				emoji: true,
			},
			imageUrl: 'https://assets3.thrillist.com/v1/image/1682388/size/tl-horizontal_main.jpg',
			altText: 'marg',
		},
	]);
WithTitle.storyName = 'with title';

export const WithNoTitle = () =>
	renderMessageBlocks([
		{
			type: 'image',
			imageUrl: 'https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1',
			altText: 'inspiration',
		},
	]);
WithNoTitle.storyName = 'with no title';
