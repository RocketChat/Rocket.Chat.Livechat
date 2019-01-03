import loremIpsum from 'lorem-ipsum';
import mem from 'mem';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Modal from '.';


const memedIpsum = mem(loremIpsum);


const LoremIpsum = ({ padding = '5rem', count = 5, units = 'paragraphs', ...options }) => (
	<div style={{ padding }}>
		{memedIpsum({ count, units, ...options }).split('\n').map((paragraph) => <p>{paragraph}</p>)}
	</div>
);


storiesOf('Components|Modal', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('opened', () => (
		<div>
			<LoremIpsum />
			<Modal open={boolean('open', true)} animated={boolean('animated', false)}>
				{text('content', memedIpsum({ count: 1, units: 'paragraphs' }))}
			</Modal>
		</div>
	))
	.add('closed', () => (
		<div>
			<LoremIpsum />
			<Modal open={boolean('open', false)} animated={boolean('animated', false)}>
				{text('content', memedIpsum({ count: 1, units: 'paragraphs' }))}
			</Modal>
		</div>
	))
	.add('animated', () => (
		<div>
			<LoremIpsum />
			<Modal open={boolean('open', true)} animated={boolean('animated', true)}>
				{text('content', memedIpsum({ count: 1, units: 'paragraphs' }))}
			</Modal>
		</div>
	))
;
