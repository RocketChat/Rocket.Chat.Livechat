import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, color, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Register from '.';

const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px', height: '500px', background: 'white' }}>
		{storyFn()}
	</div>
));

storiesOf('Screen|Register', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Register
			title={text('title', 'Need help?')}
			color={color('color', '#C1272D')}
			message={text('message', 'Please, tell us some informations to start the chat')}
			hasNameField={boolean('hasNameField', true)}
			hasEmailField={boolean('hasEmailField', true)}
			hasDepartmentField={boolean('hasDepartmentField', true)}
			departments={object('departments', [
				{
					_id: 1,
					name: 'Department #1',
				},
				{
					_id: 2,
					name: 'Department #2',
				},
				{
					_id: 3,
					name: 'Department #3',
				},
			])}
			loading={boolean('loading', false)}
			onSubmit={action('submit')}
		/>
	))
;
