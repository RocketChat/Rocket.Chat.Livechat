import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { Button } from '.';
import ChatIcon from '../../icons/chat.svg';


const defaultText = 'Powered by Rocket.Chat';
const defaultBadge = 'badged';

storiesOf('Components/Button', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('disabled', () => (
		<Button
			disabled={boolean('disabled', true)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('outline', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', true)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('nude', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', true)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('danger', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', true)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('secondary', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', true)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('stack', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', true)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('small', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', true)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('loading', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', true)}
			badge={text('badge', '')}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('with badge', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', defaultBadge)}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	))
	.add('with icon', () => (
		<Button
			disabled={boolean('disabled', false)}
			outline={boolean('outline', false)}
			nude={boolean('nude', false)}
			danger={boolean('danger', false)}
			secondary={boolean('secondary', false)}
			stack={boolean('stack', false)}
			small={boolean('small', false)}
			loading={boolean('loading', false)}
			badge={text('badge', '')}
			icon={<ChatIcon />}
			onClick={action('clicked')}
		>
			{text('text', defaultText)}
		</Button>
	));
