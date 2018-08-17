import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import c from './helper/center';
import Button, { Group } from '../src/components/button';

const text = 'Powered by Rocket.Chat';
storiesOf('Button', module).add('Simple Button', () => c(<Button onClick={action('clicked')}>{ text }</Button>));
storiesOf('Button', module).add('Disabled Button', () => c(<Button disabled onClick={action('clicked')}>{ text }</Button>));
storiesOf('Button', module).add('Simple Button outline', () => c(<Button outline onClick={action('clicked')}>{ text }</Button>));
storiesOf('Button', module).add('Simple Disabled Button outline', () => c(<Button disabled outline onClick={action('clicked')}>{ text }</Button>));

storiesOf('Button', module).add('Danger Button', () => c(<Button danger onClick={action('clicked')}>{text}</Button>));
storiesOf('Button', module).add('Disabled Danger Button', () => c(<Button disabled danger onClick={action('clicked')}>{text}</Button>));
storiesOf('Button', module).add('Danger Button outline', () => c(<Button outline danger onClick={action('clicked')}>{text}</Button>));
storiesOf('Button', module).add('Disabled Danger Button outline', () => c(<Button disabled outline danger onClick={action('clicked')}>{text}</Button>));

storiesOf('Button', module).add('Stack Button ', () => c(<Button stack onClick={action('clicked')}>{text}</Button>));
storiesOf('Button', module).add('Small Button ', () => c(<Button small onClick={action('clicked')}>{text}</Button>));


storiesOf('Group Buttons', module).add('Buttons ', () => c(<Group>
	<Button onClick={action('clicked')}>{text}</Button>
	<Button onClick={action('clicked')}>{text}</Button>
	<Button onClick={action('clicked')}>{text}</Button>
</Group>));

storiesOf('Group Buttons', module).add('Mixed Buttons ', () => c(<Group>
	<Button danger small onClick={action('clicked')}>{text}</Button>
	<Button onClick={action('clicked')}>{text}</Button>
	<Button small outline onClick={action('clicked')}>{text}</Button>
</Group>));

storiesOf('Group Buttons', module).add('Small Buttons ', () => c(<Group>
	<Button small onClick={action('clicked')}>{text}</Button>
	<Button small onClick={action('clicked')}>{text}</Button>
	<Button small onClick={action('clicked')}>{text}</Button>
</Group>));


storiesOf('Group Buttons', module).add('Stack Buttons ', () => c(<Group>
	<Button small onClick={action('clicked')}>{text}</Button>
	<Button small onClick={action('clicked')}>{text}</Button>
	<Button stack onClick={action('clicked')}>{text}</Button>
	<Button small onClick={action('clicked')}>{text}</Button>
	<Button small onClick={action('clicked')}>{text}</Button>
</Group>));
