import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { Sound } from '.';
import beepAudio from '../../../.storybook/assets/beep.mp3';
import sampleAudio from '../../../.storybook/assets/sample-audio.mp3';


storiesOf('Components/Sound', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('short', () => (
		<Sound
			src={text('src', beepAudio)}
			play={boolean('play', false)}
			onStart={action('start')}
			onStop={action('stop')}
		/>
	), { loki: { skip: true } })
	.add('long', () => (
		<Sound
			src={text('src', sampleAudio)}
			play={boolean('play', false)}
			onStart={action('start')}
			onStop={action('stop')}
		/>
	), { loki: { skip: true } });
