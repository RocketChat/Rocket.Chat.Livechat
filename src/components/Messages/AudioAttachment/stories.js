import centered from '@storybook/addon-centered/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { AudioAttachment } from '.';
import sampleAudio from '../../../../.storybook/assets/sample-audio.mp3';


storiesOf('Messages/AudioAttachment', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<AudioAttachment
			url={text('url', sampleAudio)}
		/>
	), { loki: { skip: true } });
