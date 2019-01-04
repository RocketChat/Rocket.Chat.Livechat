import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import ChatFinished from './component';


const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px' }}>
		{storyFn()}
	</div>
));

storiesOf('Screen|ChatFinished', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<ChatFinished
			title={text('title', 'Chat Finished')}
			color={color('color', '#C1272D')}
			greeting={text('greeting', 'Thanks to talk with us')}
			message={text('message', 'If you have any other question, just press the button below to start a new chat.')}
			onRedirectChat={action('redirectChat')}
		/>
	))
;
