import centered from '@storybook/addon-centered/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ImageAttachment } from '.';


storiesOf('Messages|ImageAttachment', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<ImageAttachment
			url={text('url', 'https://sample-videos.com/img/Sample-png-image-200kb.png')}
		/>
	));
