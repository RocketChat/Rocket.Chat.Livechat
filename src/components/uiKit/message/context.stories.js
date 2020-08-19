import { h } from 'preact';

import { renderMessageBlocks } from '.';

export default {
	title: 'UiKit/Message/Context block',
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(storyFn) => <div children={storyFn()} style={{ width: '100vw', maxWidth: 500 }} />,
	],
};

export const PlainText = () =>
	renderMessageBlocks([
		{
			type: 'context',
			elements: [
				{
					type: 'plain_text',
					text: 'Author: K A Applegate',
					emoji: true,
				},
			],
		},
	]);
PlainText.storyName = 'plain_text';

export const Mrkdwn = () =>
	renderMessageBlocks([
		{
			type: 'context',
			elements: [
				{
					type: 'image',
					imageUrl: 'https://www.placecage.com/g/400/400',
					altText: 'Nicolas Cage',
				},
				{
					type: 'mrkdwn',
					text: '*Cage* has approved this message.',
				},
			],
		},
	]);
Mrkdwn.storyName = 'mrkdwn';

export const TextAndImages = () =>
	renderMessageBlocks([
		{
			type: 'context',
			elements: [
				{
					type: 'mrkdwn',
					text: '*This* is :smile: markdown',
				},
				{
					type: 'image',
					imageUrl: 'https://www.placecage.com/g/400/400',
					altText: 'Nicolas Cage',
				},
				{
					type: 'image',
					imageUrl: 'https://www.placecage.com/g/400/400',
					altText: 'Nicolas Cage',
				},
				{
					type: 'image',
					imageUrl: 'https://www.placecage.com/g/400/400',
					altText: 'Nicolas Cage',
				},
				{
					type: 'plain_text',
					text: 'Author: K A Applegate',
					emoji: true,
				},
			],
		},
	]);
TextAndImages.storyName = 'text and images';
