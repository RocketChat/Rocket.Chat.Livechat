import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { TextInput } from '.';
import { Form, FormField } from '..';


storiesOf('Forms/TextInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Form>
			<FormField>
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
			</FormField>
		</Form>
	))
	.add('filled', () => (
		<Form>
			<FormField>
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
			</FormField>
		</Form>
	))
	.add('disabled', () => (
		<Form>
			<FormField>
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
			</FormField>
		</Form>
	))
	.add('small', () => (
		<Form>
			<FormField>
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
			</FormField>
		</Form>
	))
	.add('multine', () => (
		<Form>
			<FormField>
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
			</FormField>
		</Form>
	))
	.add('with error', () => (
		<Form>
			<FormField>
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
			</FormField>
		</Form>
	));
