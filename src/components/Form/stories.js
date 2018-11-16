import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, number, object, text } from '@storybook/addon-knobs';
import {
	Form,
	Item,
	Label,
	Description,
	Error,
	TextInput,
	PasswordInput,
	SelectInput,
	Field,
} from '.';
import Button, { Group } from '../Button';


storiesOf('Forms|TextInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Form>
			<Item>
				<TextInput
					value={text('value', '')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('filled', () => (
		<Form>
			<Item>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('disabled', () => (
		<Form>
			<Item>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', true)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('small', () => (
		<Form>
			<Item>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', true)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('error', () => (
		<Form>
			<Item>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', true)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('multine', () => (
		<Form>
			<Item>
				<TextInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiple={number('multiple', 3)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
;

storiesOf('Forms|PasswordInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Form>
			<Item>
				<PasswordInput
					value={text('value', '')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('filled', () => (
		<Form>
			<Item>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('disabled', () => (
		<Form>
			<Item>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', true)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('small', () => (
		<Form>
			<Item>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', true)}
					multiple={number('multiple', 1)}
					error={boolean('error', false)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('error', () => (
		<Form>
			<Item>
				<PasswordInput
					value={text('value', 'Value')}
					placeholder={text('placeholder', 'Placeholder')}
					disabled={boolean('disabled', false)}
					small={boolean('small', false)}
					multiple={number('multiple', 1)}
					error={boolean('error', true)}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
;

storiesOf('Forms|SelectInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Form>
			<Item>
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
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('selected', () => (
		<Form>
			<Item>
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
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('disabled', () => (
		<Form>
			<Item>
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
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('small', () => (
		<Form>
			<Item>
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
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('error', () => (
		<Form>
			<Item>
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
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
;

storiesOf('Forms|Label, Description, and Error', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal label', () => (
		<Form>
			<Item>
				<Label error={boolean('error', false)}>{text('label', 'Label')}</Label>
				<TextInput />
			</Item>
		</Form>
	))
	.add('error label', () => (
		<Form>
			<Item>
				<Label error={boolean('error', true)}>{text('label', 'Label')}</Label>
				<TextInput error={boolean('error', true)} />
			</Item>
		</Form>
	))
	.add('description', () => (
		<Form>
			<Item>
				<TextInput />
				<Description>{text('description', 'Description')}</Description>
			</Item>
		</Form>
	))
	.add('error', () => (
		<Form>
			<Item>
				<TextInput error={!!text('error', 'Error')} />
				<Error>{text('error', 'Error')}</Error>
			</Item>
		</Form>
	))
;

storiesOf('Forms|Item', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', ({
		inline = boolean('inline', false),
		label = text('label', 'Label'),
		value = text('value', ''),
		options = object('options', [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' },
		]),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		description = text('description', 'Description'),
		error = text('error', ''),
	}) => (
		<Form>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<SelectInput
					value={value}
					options={options}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
		</Form>
	))
	.add('multiline', ({
		inline = boolean('inline', false),
		label = text('label', 'Label'),
		value = text('value', ''),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 3),
		description = text('description', 'Description'),
		error = text('error', ''),
	}) => (
		<Form>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
		</Form>
	))
	.add('inline', ({
		inline = boolean('inline', true),
		label = text('label', 'Label'),
		value = text('value', ''),
		options = object('options', [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' },
		]),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		description = text('description', 'Description'),
		error = text('error', ''),
	}) => (
		<Form>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<SelectInput
					value={value}
					options={options}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
		</Form>
	))
;

storiesOf('Forms|Buttons', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('single stack button', ({
		inline = boolean('inline', false),
		label = text('label', 'Label'),
		value = text('value', ''),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		description = text('description', 'Description'),
		error = text('error', ''),
		buttonText = text('buttonText', 'Ok'),
	}) => (
		<Form>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
			<Item inline={inline}>
				<Button stack small={small} onClick={action('click')}>{buttonText}</Button>
			</Item>
		</Form>
	))
	.add('single small stack button', ({
		inline = boolean('inline', false),
		label = text('label', 'Label'),
		value = text('value', ''),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', true),
		multiple = number('multiple', 1),
		description = text('description', 'Description'),
		error = text('error', ''),
		buttonText = text('buttonText', 'Ok'),
	}) => (
		<Form>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
			<Item inline={inline}>
				<Button stack small={small} onClick={action('click')}>{buttonText}</Button>
			</Item>
		</Form>
	))
	.add('button group', ({
		inline = boolean('inline', false),
		label = text('label', 'Label'),
		value = text('value', ''),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		description = text('description', 'Description'),
		error = text('error', ''),
		buttonTextA = text('buttonTextA', 'Yes'),
		buttonTextB = text('buttonTextB', 'No'),
		buttonTextC = text('buttonTextC', 'Report'),
	}) => (
		<Form>
			<Item inline={inline}>
				<Label error={!!error}>{label}</Label>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
				{!inline && description && <Description>{description}</Description>}
				{!inline && error && <Error>{error}</Error>}
			</Item>
			<Item inline={inline}>
				<Group>
					<Button small={small} onClick={action('click a')}>{buttonTextA}</Button>
					<Button danger small={small} onClick={action('click b')}>{buttonTextB}</Button>
					<Button danger outline stack small={small} onClick={action('click c')}>{buttonTextC}</Button>
				</Group>
			</Item>
		</Form>
	))
;

storiesOf('Forms|Field', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('"required" validation', () => (
		<Form>
			<Field
				inline={boolean('inline', false)}
				label={text('label', 'Label')}
				required={boolean('required', true)}
				description={text('description', 'Description.')}
				error={text('error', '')}
			>
				{({ error, onChange }) => <TextInput error={!!error} onChange={onChange} />}
			</Field>

			<Field
				inline={boolean('inline', false)}
				label={text('label', 'Label')}
				required={boolean('required', true)}
				description={text('description', 'Description.')}
				error={text('error', '')}
			>
				{({ error, onChange }) => (
					<SelectInput
						error={!!error}
						onChange={onChange}
						options={object('', [
							{ value: '', label: 'Empty option' },
							{ value: '1', label: 'Option 1' },
							{ value: '2', label: 'Option 2' },
							{ value: '3', label: 'Option 3' },
						])}
					/>
				)}
			</Field>
		</Form>
	))
	.add('"email" validation', () => (
		<Form>
			<Field
				inline={boolean('inline', false)}
				label={text('label', 'Label')}
				required={boolean('required', false)}
				validations={['email']}
				description={text('description', 'Description.')}
				error={text('error', '')}
			>
				{({ error, onChange }) => <TextInput error={!!error} onChange={onChange} />}
			</Field>
		</Form>
	))
;
