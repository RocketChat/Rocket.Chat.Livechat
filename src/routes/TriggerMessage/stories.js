import { action } from '@storybook/addon-actions';
import { withKnobs, color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { screenCentered, screenProps } from '../../helpers.stories';
import TriggerMessage from './component';


storiesOf('Routes/TriggerMessages', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<TriggerMessage
			theme={{
				color: color('theme/color', ''),
				fontColor: color('theme/fontColor', ''),
				iconColor: color('theme/iconColor', ''),
			}}
			title={text('title', '')}
			onSubmit={action('submit')}
			onCancel={action('cancel')}
			{...screenProps()}
		/>
	));
