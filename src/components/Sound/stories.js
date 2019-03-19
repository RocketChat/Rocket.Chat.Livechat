import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Sound } from '.';
import { action } from '@storybook/addon-actions';


storiesOf('Components|Sound', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('short', () => (
		<Sound
			src={text('src', 'https://open.rocket.chat/sounds/chime.mp3')}
			play={boolean('play', false)}
			onStart={action('start')}
			onStop={action('stop')}
		/>
	))
	.add('long', () => (
		<Sound
			src={text('src', 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3')}
			play={boolean('play', false)}
			onStart={action('start')}
			onStop={action('stop')}
		/>
	))
;
