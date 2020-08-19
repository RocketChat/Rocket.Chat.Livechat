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
				text: 'I Need a Cage',
				emoji: true,
			},
			imageUrl: 'https://www.placecage.com/600/300',
			altText: 'Nicolas Cage',
		},
	]);
WithTitle.storyName = 'with title';

export const WithNoTitle = () =>
	renderMessageBlocks([
		{
			type: 'image',
			imageUrl: 'https://www.placecage.com/600/300',
			altText: 'Nicolas Cage',
		},
	]);
WithNoTitle.storyName = 'with no title';
