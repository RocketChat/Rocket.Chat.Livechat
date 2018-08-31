import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import Tooltip from './index';

const tooltipText = 'A simple tool tip';
const tooltipHidden = false;

storiesOf('Components|Tooltip', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('Tooltip without tail', () => (
		<Tooltip hidden={boolean('Hidden', tooltipHidden)}>{text('Text', tooltipText)}</Tooltip>
	))
	.add('Tooltips with tail', () => (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Tooltip tail="left" hidden={boolean('Hidden', tooltipHidden)}>{text('Text', tooltipText)}</Tooltip>
			<Tooltip tail="top" hidden={boolean('Hidden', tooltipHidden)}>{text('Text', tooltipText)}</Tooltip>
			<Tooltip tail="right" hidden={boolean('Hidden', tooltipHidden)}>{text('Text', tooltipText)}</Tooltip>
			<Tooltip tail="bottom" hidden={boolean('Hidden', tooltipHidden)}>{text('Text', tooltipText)}</Tooltip>
		</div>
	))
;
