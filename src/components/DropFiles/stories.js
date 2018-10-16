import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import DropFile from '.';

const Center = (storyFn) => (
	<div style="background: white; width: 100%; max-width: 350px; margin: auto; height: 500px; display: flex;">
		{storyFn()}
	</div>
);
storiesOf('Components|DropFiles', module)
	.addDecorator(Center)
	.addDecorator(withKnobs)
	.add('normal dropfile', () => (
		<DropFile onUpload={action('file')}>
			{text('text', 'heyyy drop your files here!')}
		</DropFile>
	))
;
