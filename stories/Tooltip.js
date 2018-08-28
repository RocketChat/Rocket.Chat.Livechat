import { h } from 'preact';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import c from '../../../stories/helper/center';
// import Input, { Label, Item, Description, Error, Form } from '../src/components/input';
import Tooltip from '../src/components/tooltip';
import Button from '../src/components/button';


// By default, the tooltip has no style.
// Consider importing the stylesheet it comes with:
// 'rc-tooltip/assets/bootstrap_white.css'

storiesOf('Tooltip', module).add('Input and Label, buttons', () => c(
	<Tooltip><Button>hover</Button></Tooltip>
));
