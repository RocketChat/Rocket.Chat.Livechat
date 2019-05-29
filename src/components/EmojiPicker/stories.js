import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import {
	EmojiPicker,
} from '.';
import { customEmojis } from '../../helpers.stories';


storiesOf('Components|EmojiPicker', module)
	.addDecorator(centered)
	.add('Without custom Emoji', () => (
		<EmojiPicker customEmojis={[]} />
	))
	.add('With custom Emoji', () => (
		<EmojiPicker customEmojis={customEmojis} />
	));

