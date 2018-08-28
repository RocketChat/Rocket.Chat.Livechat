import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Tooltip } from './index';

const tooltipText = 'Tooltip text';

storiesOf('Tooltip', module)
	.addDecorator(centered)
	.add('without arrowhead', () => <Tooltip>{tooltipText}</Tooltip>)
	.add('with arrowhead on top', () => <Tooltip arrowhead="top">{tooltipText}</Tooltip>)
	.add('with arrowhead on bottom', () => <Tooltip arrowhead="bottom">{tooltipText}</Tooltip>)
	.add('with arrowhead on left', () => <Tooltip arrowhead="left">{tooltipText}</Tooltip>)
	.add('with arrowhead on right', () => <Tooltip arrowhead="right">{tooltipText}</Tooltip>);
