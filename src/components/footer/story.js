import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import c from '../../../stories/helper/center';

import Footer, { Container, Powered } from './';
import Composer from '../Composer';

storiesOf('Footer', module).add('render simple Footer', () => c(<Footer onClick={action('clicked')}><Powered /></Footer>));
storiesOf('Footer', module).add('render with pre element', () => c(
	<Footer>
		<Container><Composer placeholder="Insert your text here" /></Container>
		<Container><Powered /></Container>
	</Footer>));
