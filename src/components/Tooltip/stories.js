import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Tooltip, { Placeholder } from '.';
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
	.add('inside Placeholder', () => (
		<Placeholder style={{ border: '1rem solid red', borderRadius: '20px', width: '10px', height: '10px' }}>
			<Tooltip
				hidden={boolean('hidden', tooltipHidden)}
				placement={select('placement', [null, 'left', 'top', 'right', 'bottom'])}
			>
				{text('text', tooltipText)}
			</Tooltip>
		</Placeholder>
	))
	.add('inside wrapper Placeholder', () => (
		<Placeholder>
			<Button>Test</Button>
			<Tooltip
				hidden={boolean('hidden', tooltipHidden)}
				placement={select('placement', [null, 'left', 'top', 'right', 'bottom'], 'left')}
			>
				{text('text', tooltipText)}
			</Tooltip>
		</Placeholder>
	))
;
