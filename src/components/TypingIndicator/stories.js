import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import { avatarResolver } from '../../helpers.stories';
import TypingIndicator, { TypingDots } from '.';


storiesOf('Components|TypingIndicator', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('only dots', () => (
		<TypingDots>{text('text', 'The attendant is typing')}</TypingDots>
	))
	.add('as message', () => (
		<TypingIndicator>{text('text', 'The attendant is typing')}</TypingIndicator>
	))
	.add('with avatars', () => (
		<TypingIndicator
			avatarResolver={avatarResolver}
			usernames={object('usernames', ['guilherme.gazzo', 'tasso.evangelista', 'martin.schoeler'])}
		>
			{text('text', 'The attendant is typing')}
		</TypingIndicator>
	))
;
