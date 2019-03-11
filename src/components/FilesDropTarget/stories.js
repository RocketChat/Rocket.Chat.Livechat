import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import FilesDropTarget from '.';


const DummyContent = () => (
	<div style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
		Drop files here
		<span style={{ padding: '1rem' }}>Or into this span</span>
	</div>
);

storiesOf('Components|FilesDropTarget', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => (
		<FilesDropTarget
			overlayed={boolean('overlayed', false)}
			overlayText={text('overlayText', '')}
			onUpload={action('upload')}
		>
			<DummyContent />
		</FilesDropTarget>
	))
	.add('overlayed', () => (
		<FilesDropTarget
			overlayed={boolean('overlayed', true)}
			overlayText={text('overlayText', '')}
			onUpload={action('upload')}
		>
			<DummyContent />
		</FilesDropTarget>
	))
	.add('overlayed with text', () => (
		<FilesDropTarget
			overlayed={boolean('overlayed', true)}
			overlayText={text('overlayText', 'You can release your files now')}
			onUpload={action('upload')}
		>
			<DummyContent />
		</FilesDropTarget>
	))
;
