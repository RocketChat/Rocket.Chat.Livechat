import loremIpsum from 'lorem-ipsum';
import mem from 'mem';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Modal from './component';


const memedIpsum = mem(loremIpsum);


const LoremIpsum = ({ padding = '5rem', count = 5, units = 'paragraphs', ...options }) => (
	<div style={{ padding }}>
		{memedIpsum({ count, units, ...options }).split('\n').map((paragraph) => <p>{paragraph}</p>)}
	</div>
);


storiesOf('Components|Modal', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<div>
			<LoremIpsum />
			<Modal open={boolean('open', true)} animated={boolean('animated', false)} onDismiss={action('dismiss')}>
				{text('content', memedIpsum({ count: 1, units: 'paragraphs' }))}
			</Modal>
		</div>
	))
	.add('animated', () => (
		<div>
			<LoremIpsum />
			<Modal open={boolean('open', true)} animated={boolean('animated', true)} onDismiss={action('dismiss')}>
				{text('content', memedIpsum({ count: 1, units: 'paragraphs' }))}
			</Modal>
		</div>
	))
	.add('timeout', () => (
		<div>
			<LoremIpsum />
			<Modal
				open={boolean('open', true)}
				animated={boolean('animated', false)}
				timeout={number('timeout', 3000)}
				onDismiss={action('dismiss')}
			>
				{text('content', memedIpsum({ count: 1, units: 'paragraphs' }))}
			</Modal>
		</div>
	))
	.add('disallow dismiss by overlay', () => (
		<div>
			<LoremIpsum />
			<Modal
				open={boolean('open', true)}
				animated={boolean('animated', false)}
				dismissByOverlay={false}
				onDismiss={action('dismiss')}
			>
				{text('content', memedIpsum({ count: 1, units: 'paragraphs' }))}
			</Modal>
		</div>
	))
	.add('confirm', () => (
		<div>
			<LoremIpsum />
			<Modal.Confirm
				text={text('text', 'Are you ok?')}
				confirmButtonText={text('confirmButtonText', 'Yes')}
				cancelButtonText={text('cancelButtonText', 'No')}
				onConfirm={action('confirm')}
				onCancel={action('cancel')}
			/>
		</div>
	))
	.add('alert', () => (
		<div>
			<LoremIpsum />
			<Modal.Alert
				text={text('text', 'You look great today.')}
				buttonText={text('buttonText', 'OK')}
				onConfirm={action('confirm')}
			/>
		</div>
	))
;
