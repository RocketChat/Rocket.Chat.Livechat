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
					imageUrl: 'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
					altText: 'cute cat',
				},
				{
					type: 'mrkdwn',
					text: '*Cat* has approved this message.',
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
					imageUrl: 'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
					altText: 'cute cat',
				},
				{
					type: 'image',
					imageUrl: 'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
					altText: 'cute cat',
				},
				{
					type: 'image',
					imageUrl: 'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
					altText: 'cute cat',
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
