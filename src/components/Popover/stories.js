import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs } from '@storybook/addon-knobs';
import Button from '../Button';
import { PopoverContainer, PopoverTrigger } from '.';
import { object } from '@storybook/addon-knobs/dist/vue';


storiesOf('Components|Popover', module)
	.addDecorator(withKnobs)
	.addDecorator(centered)
	.add('arbitrary renderer', () => (
		<PopoverContainer>
			<PopoverTrigger>
				{({ pop }) => (
					<Button onClick={pop}>More options...</Button>
				)}
				{({ dismiss, triggerBounds = {} }) => (
					<Button style={{ position: 'absolute', left: triggerBounds.right, top: triggerBounds.bottom }} outline onClick={dismiss}>Close me</Button>
				)}
			</PopoverTrigger>
		</PopoverContainer>
	))
	.add('with overlay props', () => (
		<PopoverContainer>
			<PopoverTrigger overlayProps={object('overlayProps', { style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } })}>
				{({ pop }) => (
					<Button onClick={pop}>More options...</Button>
				)}
				{({ dismiss, triggerBounds = {} }) => (
					<Button style={{ position: 'absolute', left: triggerBounds.right, top: triggerBounds.bottom }} outline onClick={dismiss}>Close me</Button>
				)}
			</PopoverTrigger>
		</PopoverContainer>
	))
;
