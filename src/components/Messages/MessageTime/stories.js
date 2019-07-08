import centered from '@storybook/addon-centered/react';
import { withKnobs, date } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { MessageTime } from '.';


const today = new Date();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

storiesOf('Messages|MessageTime', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('today', () => (
		<MessageTime ts={date('ts', today)} />
	))
	.add('yesterday', () => (
		<MessageTime ts={date('ts', yesterday)} />
	));
