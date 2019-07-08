import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, date } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { MessageSeparator } from '.';


const now = new Date();

storiesOf('Messages|MessageSeparator', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<MessageSeparator
			date={date('date', null)}
			unread={boolean('unread', false)}
		/>
	))
	.add('date', () => (
		<MessageSeparator
			date={date('date', now)}
			unread={boolean('unread', false)}
		/>
	))
	.add('unread', () => (
		<MessageSeparator
			date={date('date', null)}
			unread={boolean('unread', true)}
		/>
	));
