import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, color } from '@storybook/addon-knobs';
import { Alert } from '.';

const alertText = 'A simple alert';

storiesOf('Components|Alert', module)
	.addDecorator(withKnobs)
	.add('simple', () => (
		<Alert
			success={boolean('success', false)}
			warning={boolean('warning', false)}
			error={boolean('error', false)}
			onDismiss={action('clicked')}
		>
			{text('text', alertText)}
		</Alert>
	))
	.add('success', () => (
		<Alert
			success={boolean('success', true)}
			warning={boolean('warning', false)}
			error={boolean('error', false)}
			onDismiss={action('clicked')}
		>
			{text('text', alertText)}
		</Alert>
	))
	.add('warning', () => (
		<Alert
			success={boolean('success', false)}
			warning={boolean('warning', true)}
			error={boolean('error', false)}
			onDismiss={action('clicked')}
		>
			{text('text', alertText)}
		</Alert>
	))
	.add('error', () => (
		<Alert
			success={boolean('success', false)}
			warning={boolean('warning', false)}
			error={boolean('error', true)}
			onDismiss={action('clicked')}
		>
			{text('text', alertText)}
		</Alert>
	))
	.add('custom color', () => (
		<Alert
			success={boolean('success', false)}
			warning={boolean('warning', false)}
			error={boolean('error', false)}
			color={color('color', '#175CC4')}
			onDismiss={action('clicked')}
		>
			{text('text', alertText)}
		</Alert>
	))
	.add('with long text content', () => (
		<Alert
			success={boolean('success', false)}
			warning={boolean('warning', false)}
			error={boolean('error', false)}
			onDismiss={action('clicked')}
		>
			{text('text', alertText.repeat(100))}
		</Alert>
	));
