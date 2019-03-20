import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Form, FormItem } from '..';
import { PasswordInput } from '.';


storiesOf('Forms|PasswordInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<Form>
			<FormItem>
				<PasswordInput
					value={text('value', '')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					error={boolean('error', false)}
					onChange={action('change')}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('filled', () => (
		<Form>
			<FormItem>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					error={boolean('error', false)}
					onChange={action('change')}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('disabled', () => (
		<Form>
			<FormItem>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', true)}
					small={boolean('small', false)}
					error={boolean('error', false)}
					onChange={action('change')}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('small', () => (
		<Form>
			<FormItem>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', true)}
					error={boolean('error', false)}
					onChange={action('change')}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('with error', () => (
		<Form>
			<FormItem>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					error={boolean('error', true)}
					onChange={action('change')}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
;
