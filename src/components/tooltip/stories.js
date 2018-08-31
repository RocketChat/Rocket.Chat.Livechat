import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';

import Tooltip from './index';

const tooltipText = 'A simple tool tip';
const tooltipHidden = false;

storiesOf('Components|Tooltip', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('Tooltip placements', () => (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Tooltip hidden={boolean('Hidden', tooltipHidden)}>{text('Text', tooltipText)}</Tooltip>
			<Tooltip hidden={boolean('Hidden', tooltipHidden)} placement="left">{text('Text', tooltipText)}</Tooltip>
			<Tooltip hidden={boolean('Hidden', tooltipHidden)} placement="top">{text('Text', tooltipText)}</Tooltip>
			<Tooltip hidden={boolean('Hidden', tooltipHidden)} placement="right">{text('Text', tooltipText)}</Tooltip>
			<Tooltip hidden={boolean('Hidden', tooltipHidden)} placement="bottom">{text('Text', tooltipText)}</Tooltip>
		</div>
	))
;
