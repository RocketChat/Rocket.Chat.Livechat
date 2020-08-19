import { h } from 'preact';

import { renderMessageBlocks } from '.';

export default {
	title: 'UiKit/Message/Section block',
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(storyFn) => <div children={storyFn()} style={{ width: '100vw', maxWidth: 500 }} />,
	],
};

export const TextAsPlainText = () =>
	renderMessageBlocks([
		{
			type: 'section',
			text: {
				type: 'plain_text',
				text: 'This is a plain text section block.',
				emoji: true,
			},
		},
	]);
TextAsPlainText.storyName = 'text as plain_text';

export const TextAsMarkdown = () =>
	renderMessageBlocks([
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and [this is a link](https://google.com)',
			},
		},
	]);
TextAsMarkdown.storyName = 'text as mrkdwn';

export const TextFields = () =>
	renderMessageBlocks([
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
	]);
TextFields.storyName = 'text fields';

export const AccessoryAsButton = () =>
	renderMessageBlocks([
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
	]);
AccessoryAsButton.storyName = 'accessory as button';

export const AccessoryAsImage = () =>
	renderMessageBlocks([
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
	]);
AccessoryAsImage.storyName = 'accessory as button';

export const AccessoryAsOverflowMenu = () =>
	renderMessageBlocks([
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
	]);
AccessoryAsOverflowMenu.storyName = 'accessory as overflow menu';

export const AccessoryAsDatePicker = () =>
	renderMessageBlocks([
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
	]);
AccessoryAsDatePicker.storyName = 'accessory as datepicker';
