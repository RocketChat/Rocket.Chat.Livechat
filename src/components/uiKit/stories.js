import { withKnobs, object } from '@storybook/addon-knobs';

import { renderMessageBlocks } from '.';

export default {
	title: 'UiKit/UiKitOmnichannelMessage',
	decorators: [
		withKnobs,
	],
};

export const Example = () =>
	renderMessageBlocks(
		object('blocks', [
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: 'I am an item',
				},
			},
		]),
	);
