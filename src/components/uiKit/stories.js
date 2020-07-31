import { withKnobs, object } from '@storybook/addon-knobs';
import { h } from 'preact';

import { UiKitOmnichannelMessage } from '.';

export default {
	title: 'UiKit/UiKitOmnichannelMessage',
	decorators: [
		withKnobs,
	],
};

export const Example = () =>
	<UiKitOmnichannelMessage
		blocks={object('blocks', [
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: 'I am an item',
				},
			},
		])}
	/>;
