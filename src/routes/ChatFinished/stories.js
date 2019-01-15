import { action } from '@storybook/addon-actions';
import { withKnobs, color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered } from '../helpers.stories';
import ChatFinished from './component';


storiesOf('Routes|ChatFinished', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<ChatFinished
			title={text('title', 'Chat Finished')}
			color={color('color', '#C1272D')}
			greeting={text('greeting', 'Thanks for talking with us')}
			message={text('message', 'If you have any other questions, just press the button below to start a new chat.')}
			onRedirectChat={action('redirectChat')}
		/>
	))
;
