import centered from '@storybook/addon-centered/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { AudioAttachment } from '.';


storiesOf('Messages|AudioAttachment', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<AudioAttachment
			url={text('url', 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3')}
		/>
	));
