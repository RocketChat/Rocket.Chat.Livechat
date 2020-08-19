import { h } from 'preact';

import MessageBlocks from '.';

export default {
	title: 'Messages/MessageBlocks',
	parameters: {
		layout: 'centered',
	},
};

export const WithBlocks = () =>
	<MessageBlocks
		blocks={[
			{
				type: 'divider',
			},
			{
				type: 'section',
				text: {
					type: 'plain_text',
					text: 'This is a plain text section block.',
					emoji: true,
				},
			},
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>',
				},
			},
			{
				type: 'section',
				fields: [
					{
						type: 'plain_text',
						text: '*this is plain_text text*',
						emoji: true,
					},
					{
						type: 'plain_text',
						text: '*this is plain_text text*',
						emoji: true,
					},
					{
						type: 'plain_text',
						text: '*this is plain_text text*',
						emoji: true,
					},
					{
						type: 'plain_text',
						text: '*this is plain_text text*',
						emoji: true,
					},
					{
						type: 'plain_text',
						text: '*this is plain_text text*',
						emoji: true,
					},
				],
			},
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: 'This is a section block with a button.',
				},
				accessory: {
					type: 'button',
					text: {
						type: 'plain_text',
						text: 'Click Me',
						emoji: true,
					},
					value: 'click_me_123',
				},
			},
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: 'This is a section block with an accessory image.',
				},
				accessory: {
					type: 'image',
					imageUrl: 'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
					altText: 'cute cat',
				},
			},
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: 'This is a section block with an overflow menu.',
				},
				accessory: {
					type: 'overflow',
					options: [
						{
							text: {
								type: 'plain_text',
								text: '*this is plain_text text*',
								emoji: true,
							},
							value: 'value-0',
						},
						{
							text: {
								type: 'plain_text',
								text: '*this is plain_text text*',
								emoji: true,
							},
							value: 'value-1',
						},
						{
							text: {
								type: 'plain_text',
								text: '*this is plain_text text*',
								emoji: true,
							},
							value: 'value-2',
						},
						{
							text: {
								type: 'plain_text',
								text: '*this is plain_text text*',
								emoji: true,
							},
							value: 'value-3',
						},
						{
							text: {
								type: 'plain_text',
								text: '*this is plain_text text*',
								emoji: true,
							},
							value: 'value-4',
						},
					],
				},
			},
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: 'Pick a date for the deadline.',
				},
				accessory: {
					type: 'datepicker',
					initial_date: '1990-04-28',
					placeholder: {
						type: 'plain_text',
						text: 'Select a date',
						emoji: true,
					},
				},
			},
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
			{
				type: 'image',
				imageUrl: 'https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1',
				altText: 'inspiration',
			},
			{
				type: 'actions',
				elements: [
					{
						type: 'conversations_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select a conversation',
							emoji: true,
						},
					},
					{
						type: 'channels_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select a channel',
							emoji: true,
						},
					},
					{
						type: 'users_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select a user',
							emoji: true,
						},
					},
					{
						type: 'static_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select an item',
							emoji: true,
						},
						options: [
							{
								text: {
									type: 'plain_text',
									text: '*this is plain_text text*',
									emoji: true,
								},
								value: 'value-0',
							},
							{
								text: {
									type: 'plain_text',
									text: '*this is plain_text text*',
									emoji: true,
								},
								value: 'value-1',
							},
							{
								text: {
									type: 'plain_text',
									text: '*this is plain_text text*',
									emoji: true,
								},
								value: 'value-2',
							},
						],
					},
				],
			},
			{
				type: 'actions',
				elements: [
					{
						type: 'conversations_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select private conversation',
							emoji: true,
						},
						filter: {
							include: [
								'private',
							],
						},
					},
				],
			},
			{
				type: 'actions',
				elements: [
					{
						type: 'conversations_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select a conversation',
							emoji: true,
						},
						initialConversation: 'D123',
					},
					{
						type: 'users_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select a user',
							emoji: true,
						},
						initialUser: 'U123',
					},
					{
						type: 'channels_select',
						placeholder: {
							type: 'plain_text',
							text: 'Select a channel',
							emoji: true,
						},
						initialChannel: 'C123',
					},
				],
			},
			{
				type: 'actions',
				elements: [
					{
						type: 'button',
						text: {
							type: 'plain_text',
							text: 'Click Me',
							emoji: true,
						},
						value: 'click_me_123',
					},
				],
			},
			{
				type: 'actions',
				elements: [
					{
						type: 'datepicker',
						initialDate: '1990-04-28',
						placeholder: {
							type: 'plain_text',
							text: 'Select a date',
							emoji: true,
						},
					},
					{
						type: 'datepicker',
						initialDate: '1990-04-28',
						placeholder: {
							type: 'plain_text',
							text: 'Select a date',
							emoji: true,
						},
					},
				],
			},
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
			{
				type: 'conditional',
				when: {
					engine: ['livechat'],
				},
				render: [
					{
						type: 'section',
						text: {
							type: 'plain_text',
							text: 'This is a plain text section block.',
							emoji: true,
						},
					},
				],
			},
		]}
	/>;
WithBlocks.storyName = 'with blocks';
