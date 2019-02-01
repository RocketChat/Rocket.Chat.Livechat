import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered, screenProps } from '../helpers.stories';
import ChatFinished from './component';


storiesOf('Routes|ChatFinished', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<ChatFinished
			title={text('title', 'Chat Finished')}
			greeting={text('greeting', '')}
			message={text('message', '')}
			onRedirectChat={action('redirectChat')}
			{...screenProps()}
		/>
	))
;
