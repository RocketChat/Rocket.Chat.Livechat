import centered from '@storybook/addon-centered/react';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { avatarResolver } from '../../../helpers.stories';
import { TypingIndicator } from '.';


storiesOf('Messages|TypingIndicator', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<TypingIndicator
			avatarResolver={avatarResolver}
			usernames={object('usernames', [])}
			text={text('text', 'The attendant is typing')}
		/>
	))
	.add('with avatars', () => (
		<TypingIndicator
			avatarResolver={avatarResolver}
			usernames={object('usernames', ['guilherme.gazzo', 'tasso.evangelista', 'martin.schoeler'])}
			text={text('text', 'The attendant is typing')}
		/>
	));
