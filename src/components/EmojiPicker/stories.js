import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import {
	EmojiPicker,
} from '.';
// import { categories } from './categories';


storiesOf('Components|EmojiPicker', module)
	.addDecorator(centered)
	.add('Picker', () => (
		<EmojiPicker />
	));

