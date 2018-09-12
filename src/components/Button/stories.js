import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Button, { Group } from '.';

const text = 'Powered by Rocket.Chat';

storiesOf('Components|Button', module)
	.addDecorator(centered)
	.add('Normal button', () => <Button onClick={action('clicked')}>{text}</Button>)
	.add('Disabled button', () => <Button disabled onClick={action('clicked')}>{text}</Button>)
	.add('Outline button', () => <Button outline onClick={action('clicked')}>{text}</Button>)
	.add('Disabled outline button', () => <Button disabled outline onClick={action('clicked')}>{text}</Button>)
	.add('Danger button', () => <Button danger onClick={action('clicked')}>{text}</Button>)
	.add('Disabled danger button', () => <Button disabled danger onClick={action('clicked')}>{text}</Button>)
	.add('Danger outline button', () => <Button outline danger onClick={action('clicked')}>{text}</Button>)
	.add('Disabled danger outline button', () => <Button disabled outline danger onClick={action('clicked')}>{text}</Button>)
	.add('Stack button', () => <Button stack onClick={action('clicked')}>{text}</Button>)
	.add('Small button', () => <Button small onClick={action('clicked')}>{text}</Button>);

storiesOf('Components|Button/Group', module)
	.addDecorator(centered)
	.add('Normal buttons', () => (<Group>
		<Button onClick={action('clicked')}>{text}</Button>
		<Button onClick={action('clicked')}>{text}</Button>
		<Button onClick={action('clicked')}>{text}</Button>
	</Group>))
	.add('Mixed buttons ', () => (<Group>
		<Button danger small onClick={action('clicked')}>{text}</Button>
		<Button onClick={action('clicked')}>{text}</Button>
		<Button small outline onClick={action('clicked')}>{text}</Button>
	</Group>))
	.add('Small buttons', () => (<Group>
		<Button small onClick={action('clicked')}>{text}</Button>
		<Button small onClick={action('clicked')}>{text}</Button>
		<Button small onClick={action('clicked')}>{text}</Button>
	</Group>))
	.add('Stack buttons', () => (<Group>
		<Button small onClick={action('clicked')}>{text}</Button>
		<Button small onClick={action('clicked')}>{text}</Button>
		<Button stack onClick={action('clicked')}>{text}</Button>
		<Button danger onClick={action('clicked')}>{text}</Button>
		<Button small onClick={action('clicked')}>{text}</Button>
		<Button small onClick={action('clicked')}>{text}</Button>
	</Group>));
