import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { Sound } from '.';
import beepAudio from '../../../.storybook/assets/beep.mp3';
import sampleAudio from '../../../.storybook/assets/sample-audio.mp3';
import { centered } from '../../helpers.stories';


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
