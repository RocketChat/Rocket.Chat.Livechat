import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import ChatButton from '.';


storiesOf('Components|ChatButton', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<ChatButton
			open={boolean('open', false)}
			onClick={action('clicked')}
		/>
	))
	.add('opened', () => (
		<ChatButton
			open={boolean('open', true)}
			onClick={action('clicked')}
		/>
	))
;
