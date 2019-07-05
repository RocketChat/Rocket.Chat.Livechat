import centered from '@storybook/addon-centered/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { VideoAttachment } from '.';


storiesOf('Messages|VideoAttachment', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<VideoAttachment
			url={text('url', 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4')}
		/>
	));
