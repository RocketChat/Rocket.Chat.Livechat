import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered, screenProps } from '../../helpers.stories';
import Register from './component';


storiesOf('Routes|Register', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Register
			title={text('title', '')}
			message={text('message', '')}
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
			{...screenProps()}
		/>
	))
	.add('loading', () => (
		<Register
			title={text('title', '')}
			message={text('message', '')}
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
			loading={boolean('loading', true)}
			onSubmit={action('submit')}
			{...screenProps()}
		/>
	))
;
