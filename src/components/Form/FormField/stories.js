import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';


import { memedIpsum } from '../../../helpers.stories';
import { FormField } from '.';

import { Form, TextInput } from '..';


storiesOf('Forms|FormField', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Form>
			<FormField
				required={boolean('required', false)}
				label={text('label', 'Label')}
				description={text('description', 'Description')}
				error={text('error', '')}
			>
				<TextInput value={memedIpsum({ count: 3, units: 'words' })} />
			</FormField>
		</Form>
	))
	.add('required', () => (
		<Form>
			<FormField
				required={boolean('required', true)}
				label={text('label', 'Label')}
				description={text('description', 'Description')}
				error={text('error', '')}
			>
				<TextInput value={memedIpsum({ count: 3, units: 'words' })} />
			</FormField>
		</Form>
	))
	.add('with error', () => (
		<Form>
			<FormField
				required={boolean('required', false)}
				label={text('label', 'Label')}
				description={text('description', 'Description')}
				error={text('error', 'Error')}
			>
				<TextInput value={memedIpsum({ count: 3, units: 'words' })} />
			</FormField>
		</Form>
	));
