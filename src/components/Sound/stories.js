import path from 'path';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, selectV2 as select } from '@storybook/addon-knobs';
import Sound from '.';


const req = require.context('./', true, /\.mp3$/);
const soundSet = req.keys()
	.map((filename) => ({
		name: path.basename(filename, '.mp3'),
		src: req(filename),
	}))
	.reduce((set, { name, src }) => ({ ...set, [name]: src }), {});

const soundsSelect = Object.keys(soundSet)
	.reduce((obj, value) => ({ ...obj, [value]: value }), {});

storiesOf('Components|Sound', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('all', ({ name = select('src', soundsSelect, 'chime') }) => (
		<div style={{ textAlign: 'center' }}>
			<Sound src={soundSet[name]} play={boolean('play', false)} />
			<p>{name}</p>
			<p style={{ fontStyle: 'italic', fontSize: '.75rem' }}>
				Check the <code>play</code> knob to trigger the sound
			</p>
		</div>
	))
;
