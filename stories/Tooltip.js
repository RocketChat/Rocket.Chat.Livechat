import { h } from 'preact';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import c from './helper/center';
// import Input, { Label, Item, Description, Error, Form } from '../src/components/input';
// import Button, { Group } from '../src/components/button';

const Tooltip = require('rc-tooltip');

// By default, the tooltip has no style.
// Consider importing the stylesheet it comes with:
// 'rc-tooltip/assets/bootstrap_white.css'

storiesOf('Tooltip', module).add('Input and Label, buttons', () => c(<Tooltip placement="left" trigger={['click']} overlay={<span>tooltip</span>}>
	<a href="#">hover</a>
</Tooltip>));
