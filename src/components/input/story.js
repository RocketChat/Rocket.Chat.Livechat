import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import c from '../../../stories/helper/center';
import Input, { Label, Item, Description, Error, Form } from './';
import Button, { Group } from '../Button';

const text = 'Powered by Rocket.Chat';
storiesOf('Form', module).add('Simple Input', () => c(<Input onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>));
storiesOf('Form', module).add('Small Input', () => c(<Input small onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>));


storiesOf('Form', module).add('Input, Label, Description', () => c(
	<Item>
		<Label>alo</Label>
		<Input onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
		<Description>bla bla bla bla</Description>
	</Item>
));

storiesOf('Form', module).add('Input, Label, Error', () => c(
	<Item>
		<Label error>alo</Label>
		<Input error onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
		<Error>bla bla bla bla</Error>
	</Item>
));

storiesOf('Form', module).add('Input and Label- Inline', () => c(
	<Item inline>
		<Label>alo</Label>
		<Input onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
	</Item>
));

storiesOf('Form', module).add('Input and Label, stack button', () => c(
	<Form>
		<Item>
			<Label>alo</Label>
			<Input onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
		</Item>
		<Item>
			<Button stack onClick={action('clicked')}>{text}</Button>
		</Item>
	</Form>
));

storiesOf('Form', module).add('Input and Label, small stack button', () => c(
	<Form>
		<Item>
			<Label>alo</Label>
			<Input onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
		</Item>
		<Item>
			<Button small stack onClick={action('clicked')}>{text}</Button>
		</Item>
	</Form>
));

storiesOf('Form', module).add('Input and Label, buttons', () => c(
	<Form>
		<Item>
			<Label>alo</Label>
			<Input onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
		</Item>
		<Item>
			<Group>
				<Button onClick={action('clicked')}>hello</Button>
				<Button danger onClick={action('clicked')}>hi</Button>
				<Button danger outline stack onClick={action('clicked')}>hi</Button>
			</Group>
		</Item>
	</Form>
));

storiesOf('Form', module).add('Input, Label, Description, stack button', () => c(
	<Form>
		<Item>
			<Label>alo</Label>
			<Input onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
			<Description>bla bla bla bla</Description>
		</Item>
		<Item>
			<Button stack onClick={action('clicked')}>{text}</Button>
		</Item>
	</Form>
));


storiesOf('Form', module).add('Input and Label, stack button - Error', () => c(
	<Form>
		<Item>
			<Label error>alo</Label>
			<Input error onClick={action('clicked')} onFocus={action('focus')} onInput={action('input')}>{text}</Input>
			<Error> Invalid field</Error>
		</Item>
		<Item>
			<Button disabled stack onClick={action('clicked')}>{text}</Button>
		</Item>
	</Form>
));
