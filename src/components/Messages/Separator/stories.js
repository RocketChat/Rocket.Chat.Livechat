import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, date } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Separator } from '.';


const now = new Date();

storiesOf('Messages|Separator', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<Separator
			date={date('date', null)}
			unread={boolean('unread', false)}
		/>
	))
	.add('date', () => (
		<Separator
			date={date('date', now)}
			unread={boolean('unread', false)}
		/>
	))
	.add('unread', () => (
		<Separator
			date={date('date', null)}
			unread={boolean('unread', true)}
		/>
	))
;
