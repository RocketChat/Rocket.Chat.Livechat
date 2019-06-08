import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import {
	EmojiPicker,
} from '.';
import { customEmojis } from '../../helpers.stories';

const host = 'https://open.rocket.chat';

storiesOf('Components|EmojiPicker', module)
	.addDecorator(centered)
	.add('Without custom Emoji', () => (
		<EmojiPicker customEmojis={[]} host={host} />
	))
	.add('With custom Emoji', () => (
		<EmojiPicker customEmojis={customEmojis} host={host} />
	));

