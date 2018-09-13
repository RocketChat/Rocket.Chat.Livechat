import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import Button, { Group } from '.';

const buttonText = 'Powered by Rocket.Chat';

storiesOf('Components|Button', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			danger={boolean('danger', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			onClick={action('clicked')}
		>
			{text('text', buttonText)}
		</Button>
	))
	.add('disabled', () => (
		<Button
			disabled={boolean('disabled', true)}
			outline={boolean('outline', false)}
			danger={boolean('danger', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			onClick={action('clicked')}
		>
			{text('text', buttonText)}
		</Button>
	))
	.add('outline', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', true)}
			danger={boolean('danger', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			onClick={action('clicked')}
		>
			{text('text', buttonText)}
		</Button>
	))
	.add('danger', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			danger={boolean('danger', true)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			onClick={action('clicked')}
		>
			{text('text', buttonText)}
		</Button>
	))
	.add('stack', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			danger={boolean('danger', false)}
			stack={boolean('stack', true)}
			small={boolean('small', false)}
			onClick={action('clicked')}
		>
			{text('text', buttonText)}
		</Button>
	))
	.add('small', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			danger={boolean('danger', false)}
			stack={boolean('stack', false)}
			small={boolean('small', true)}
			onClick={action('clicked')}
		>
			{text('text', buttonText)}
		</Button>
	));

storiesOf('Components|Button/Group', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('with buttons of same size', () => (
		<Group>
			<Button>{text('button text 1', 'Yes')}</Button>
			<Button outline>{text('button text 2', 'Cancel')}</Button>
			<Button danger>{text('button text 3', 'No')}</Button>
		</Group>
	))
	.add('with buttons of different sizes', () => (
		<Group>
			<Button small>{text('button text 1', 'Yes')}</Button>
			<Button outline>{text('button text 2', 'Cancel')}</Button>
			<Button small danger>{text('button text 3', 'No')}</Button>
		</Group>
	))
	.add('with only small buttons', () => (
		<Group>
			<Button small>{text('button text 1', 'Yes')}</Button>
			<Button small outline>{text('button text 2', 'Cancel')}</Button>
			<Button small danger>{text('button text 3', 'No')}</Button>
		</Group>
	))
	.add('with stacked buttons', () => (
		<Group>
			<Button small outline>Rename</Button>
			<Button small outline>Share</Button>
			<Button stack danger>Delete</Button>
		</Group>
	));
