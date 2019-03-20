import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Form, FormItem } from '..';
import { TextInput } from '.';


storiesOf('Forms|TextInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Form>
			<FormItem>
				<TextInput
					value={text('value', '')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiline={boolean('multiline', false)}
					rows={number('rows', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('filled', () => (
		<Form>
			<FormItem>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiline={boolean('multiline', false)}
					rows={number('rows', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('disabled', () => (
		<Form>
			<FormItem>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', true)}
					small={boolean('small', false)}
					multiline={boolean('multiline', false)}
					rows={number('rows', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('small', () => (
		<Form>
			<FormItem>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', true)}
					multiline={boolean('multiline', false)}
					rows={number('rows', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('multine', () => (
		<Form>
			<FormItem>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiline={boolean('multiline', true)}
					rows={number('rows', 3)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
	.add('with error', () => (
		<Form>
			<FormItem>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiline={boolean('multiline', false)}
					rows={number('rows', 1)}
					error={boolean('error', true)}
					onInput={action('input')}
				/>
			</FormItem>
		</Form>
	))
;

