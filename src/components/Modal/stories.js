import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Modal from '.';

storiesOf('Components|Modal', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('opened', () => (
		<div>
			Hello Modal!
			<Modal open={boolean('open', true)} overlay={boolean('overlay', true)}>{text('text', 'hey')}</Modal>
		</div>
	)).add('closed', () => (
		<div>
			Hello Modal!
			<Modal open={boolean('open', false)} overlay={boolean('overlay', true)}>{text('text', 'hey')}</Modal>
		</div>
	));
