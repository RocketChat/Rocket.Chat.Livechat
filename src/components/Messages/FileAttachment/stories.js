import centered from '@storybook/addon-centered/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { memedIpsum } from '../../../helpers.stories';
import { FileAttachment } from '.';


const centeredWithWidth = (storyFn, ...args) => centered(() => (
	<div style={{ width: '365px' }}>
		{storyFn()}
	</div>
), ...args);

storiesOf('Messages|FileAttachment', module)
	.addDecorator(centeredWithWidth)
	.addDecorator(withKnobs)
	.add('for pdf', () => (
		<FileAttachment
			title={text('title', 'Untitle')}
			url={text('url', 'http://localhost:3000/demo.pdf')}
		/>
	))
	.add('for doc', () => (
		<FileAttachment
			title={text('title', 'Untitle')}
			url={text('url', 'http://localhost:3000/demo.doc')}
		/>
	))
	.add('for ppt', () => (
		<FileAttachment
			title={text('title', 'Untitle')}
			url={text('url', 'http://localhost:3000/demo.ppt')}
		/>
	))
	.add('for xls', () => (
		<FileAttachment
			title={text('title', 'Untitle')}
			url={text('url', 'http://localhost:3000/demo.xls')}
		/>
	))
	.add('for zip', () => (
		<FileAttachment
			title={text('title', 'Untitle')}
			url={text('url', 'http://localhost:3000/demo.zip')}
		/>
	))
	.add('for unknown extension', () => (
		<FileAttachment
			title={text('title', 'Untitle')}
			url={text('url', 'http://localhost:3000/demo.abc')}
		/>
	))
	.add('with long title', () => (
		<FileAttachment
			title={text('title', memedIpsum({ count: 50, units: 'words' }))}
			url={text('url', 'http://localhost:3000/demo.abc')}
		/>
	));
