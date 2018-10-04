import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Tooltip, { TooltipConnector, withTooltip } from '.';
import Button from '../Button';

const tooltipText = 'A simple tool tip';
const tooltipHidden = false;

storiesOf('Components|Tooltip', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('inline', () => (
		<Tooltip
			hidden={boolean('hidden', tooltipHidden)}
			placement={select('placement', [null, 'left', 'top', 'right', 'bottom'])}
		>
			{text('text', tooltipText)}
		</Tooltip>
	))
	.add('placements', () => (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Tooltip hidden={boolean('hidden', tooltipHidden)} placement="left">{text('text', tooltipText)}</Tooltip>
			<Tooltip hidden={boolean('hidden', tooltipHidden)} placement="top">{text('text', tooltipText)}</Tooltip>
			<Tooltip hidden={boolean('hidden', tooltipHidden)} placement="right">{text('text', tooltipText)}</Tooltip>
			<Tooltip hidden={boolean('hidden', tooltipHidden)} placement="bottom">{text('text', tooltipText)}</Tooltip>
		</div>
	))
	.add('connected to another component', () => (
		<TooltipConnector text={text('text', tooltipText)} placement={select('placement', [null, 'left', 'top', 'right', 'bottom'], 'bottom')}>
			<Button>A simple button</Button>
		</TooltipConnector>
	))
	.add('withTooltip()', () => {
		const MyComponent = withTooltip(() => <Button>A simple button</Button>);

		return (<MyComponent tooltip={text('tooltip', tooltipText)} />);
	})
;
