import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import ChatButton from '.';


storiesOf('Components|ChatButton', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<ChatButton
			open={boolean('open', false)}
			badge={text('badge', '')}
			theme={{
				color: color('theme.color', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			text={text('text', 'Open chat')}
			onClick={action('clicked')}
		/>
	))
	.add('with badge', () => (
		<ChatButton
			open={boolean('open', false)}
			badge={text('badge', '1')}
			theme={{
				color: color('theme.color', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			text={text('text', 'Open chat')}
			onClick={action('clicked')}
		/>
	))
	.add('with theme', () => (
		<ChatButton
			open={boolean('open', false)}
			badge={text('badge', '')}
			theme={{
				color: color('theme.color', 'darkred'),
				iconColor: color('theme.iconColor', 'peachpuff'),
			}}
			text={text('text', 'Open chat')}
			onClick={action('clicked')}
		/>
	))
	.add('opened', () => (
		<ChatButton
			open={boolean('open', true)}
			badge={text('badge', '')}
			theme={{
				color: color('theme.color', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			text={text('text', 'Close chat')}
			onClick={action('clicked')}
		/>
	))
;
