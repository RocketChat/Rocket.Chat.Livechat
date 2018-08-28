import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { Tooltip } from './index';

const tooltipText = 'Tooltip text';

storiesOf('Tooltip', module)
	.add('without arrowhead', () => <Tooltip>{tooltipText}</Tooltip>)
	.add('with arrowhead on top', () => <Tooltip arrowhead="top">{tooltipText}</Tooltip>)
	.add('with arrowhead on bottom', () => <Tooltip arrowhead="bottom">{tooltipText}</Tooltip>)
	.add('with arrowhead on left', () => <Tooltip arrowhead="left">{tooltipText}</Tooltip>)
	.add('with arrowhead on right', () => <Tooltip arrowhead="right">{tooltipText}</Tooltip>);
