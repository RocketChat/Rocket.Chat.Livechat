import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { memedIpsum } from '../../../helpers.stories';
import { MessageBubble } from '.';


const DummyContent = () => (
	<div style={{ padding: '9px' }}>
		{memedIpsum({ count: 1, units: 'sentences' })}
	</div>
);

storiesOf('Messages|MessageBubble', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<MessageBubble
			inverse={boolean('inverse', false)}
		>
			<DummyContent />
		</MessageBubble>
	))
	.add('inverse', () => (
		<MessageBubble
			inverse={boolean('inverse', true)}
		>
			<DummyContent />
		</MessageBubble>
	))
;
