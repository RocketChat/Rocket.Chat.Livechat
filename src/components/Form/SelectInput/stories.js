import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Form, FormItem } from '..';
import { SelectInput } from '.';


storiesOf('Forms|SelectInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Form>
			<FormItem>
				<SelectInput
					value={text('value', '')}
					options={object('options', [
						{ value: '1', label: 'Option 1' },
						{ value: '2', label: 'Option 2' },
						{ value: '3', label: 'Option 3' },
					])}
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
	.add('selected', () => (
		<Form>
			<FormItem>
				<SelectInput
					value={text('value', '2')}
					options={object('options', [
						{ value: '1', label: 'Option 1' },
						{ value: '2', label: 'Option 2' },
						{ value: '3', label: 'Option 3' },
					])}
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
				<SelectInput
					value={text('value', '2')}
					options={object('options', [
						{ value: '1', label: 'Option 1' },
						{ value: '2', label: 'Option 2' },
						{ value: '3', label: 'Option 3' },
					])}
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
				<SelectInput
					value={text('value', '2')}
					options={object('options', [
						{ value: '1', label: 'Option 1' },
						{ value: '2', label: 'Option 2' },
						{ value: '3', label: 'Option 3' },
					])}
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
	.add('error', () => (
		<Form>
			<FormItem>
				<SelectInput
					value={text('value', '2')}
					options={object('options', [
						{ value: '1', label: 'Option 1' },
						{ value: '2', label: 'Option 2' },
						{ value: '3', label: 'Option 3' },
					])}
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
