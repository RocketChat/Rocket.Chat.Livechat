import centered from '@storybook/addon-centered/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { h } from 'preact';

import { ImageAttachment } from '.';
import sampleImage from '../../../../.storybook/assets/sample-image.jpg';

storiesOf('Messages/ImageAttachment', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<ImageAttachment
			url={text('url', sampleImage)}
		/>
	));
