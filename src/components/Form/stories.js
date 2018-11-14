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
	.add('empty', ({
		value = text('value', ''),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('filled', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('disabled', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', true),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('small', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', true),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('error', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', true),
	}) => (
		<Form>
			<Item>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('multine', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 3),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<TextInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
;

storiesOf('Forms|PasswordInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', ({
		value = text('value', ''),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<PasswordInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('filled', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<PasswordInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('disabled', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', true),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<PasswordInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('small', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', true),
		multiple = number('multiple', 1),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<PasswordInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('error', ({
		value = text('value', 'Value'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		multiple = number('multiple', 1),
		error = boolean('error', true),
	}) => (
		<Form>
			<Item>
				<PasswordInput
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					small={small}
					multiple={multiple}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
;

storiesOf('Forms|SelectInput', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', ({
		value = text('value', ''),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		options = object('options', {
			1: 'Option 1',
			2: 'Option 2',
			3: 'Option 3',
		}),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<SelectInput
					value={value}
					placeholder={placeholder}
					options={options}
					disabled={disabled}
					small={small}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('selected', ({
		value = text('value', '2'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		options = object('options', {
			1: 'Option 1',
			2: 'Option 2',
			3: 'Option 3',
		}),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<SelectInput
					value={value}
					placeholder={placeholder}
					options={options}
					disabled={disabled}
					small={small}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('disabled', ({
		value = text('value', '2'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', true),
		small = boolean('small', false),
		options = object('options', {
			1: 'Option 1',
			2: 'Option 2',
			3: 'Option 3',
		}),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<SelectInput
					value={value}
					placeholder={placeholder}
					options={options}
					disabled={disabled}
					small={small}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('small', ({
		value = text('value', '2'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', true),
		options = object('options', {
			1: 'Option 1',
			2: 'Option 2',
			3: 'Option 3',
		}),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<SelectInput
					value={value}
					placeholder={placeholder}
					options={options}
					disabled={disabled}
					small={small}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
	.add('error', ({
		value = text('value', '2'),
		placeholder = text('placeholder', 'Placeholder'),
		disabled = boolean('disabled', false),
		small = boolean('small', false),
		options = object('options', {
			1: 'Option 1',
			2: 'Option 2',
			3: 'Option 3',
		}),
		error = boolean('error', true),
	}) => (
		<Form>
			<Item>
				<SelectInput
					value={value}
					placeholder={placeholder}
					options={options}
					disabled={disabled}
					small={small}
					error={error}
					onInput={action('input')}
				/>
			</Item>
		</Form>
	))
;

storiesOf('Forms|Label, Description, and Error', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal label', ({
		label = text('label', 'Label'),
		error = boolean('error', false),
	}) => (
		<Form>
			<Item>
				<Label error={error}>{label}</Label>
				<TextInput />
			</Item>
		</Form>
	))
	.add('error label', ({
		label = text('label', 'Label'),
		error = boolean('error', true),
	}) => (
		<Form>
			<Item>
				<Label error={error}>{label}</Label>
				<TextInput error={error} />
			</Item>
		</Form>
	))
	.add('description', ({
		description = text('description', 'Description'),
	}) => (
		<Form>
			<Item>
				<TextInput />
				<Description>{description}</Description>
			</Item>
		</Form>
	))
	.add('error', ({
		error = text('error', 'Error'),
	}) => (
		<Form>
			<Item>
				<TextInput error={!!error} />
				<Error>{error}</Error>
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
		options = object('options', {
			1: 'Option 1',
			2: 'Option 2',
			3: 'Option 3',
		}),
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
		options = object('options', {
			1: 'Option 1',
			2: 'Option 2',
			3: 'Option 3',
		}),
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
	.add('text', () => (
		<Form>
			<Field
				inline={boolean('inline', false)}
				label={text('label', 'Label')}
				required={boolean('required', true)}
				description={text('description', 'Description.')}
				error={text('error', '')}
				type="text"
				value={text('value', 'Value')}
			/>
		</Form>
	))
	.add('password', () => (
		<Form>
			<Field
				inline={boolean('inline', false)}
				label={text('label', 'Label')}
				required={boolean('required', true)}
				description={text('description', 'Description.')}
				error={text('error', '')}
				type="password"
				value={text('value', 'Value')}
			/>
		</Form>
	))
	.add('select', () => (
		<Form>
			<Field
				inline={boolean('inline', false)}
				label={text('label', 'Label')}
				required={boolean('required', true)}
				description={text('description', 'Description.')}
				error={text('error', '')}
				type="select"
				value={text('value', '1')}
				options={{
					1: 'Option 1',
					2: 'Option 2',
					3: 'Option 3',
				}}
			/>
		</Form>
	))
;
