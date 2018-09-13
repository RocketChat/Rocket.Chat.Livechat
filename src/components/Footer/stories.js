import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Footer, { Container, PoweredBy } from '.';
import Composer from '../Composer';

const stickyFooterDecorator = (storyFn) => (
	<div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'stretch', overflow: 'auto' }}>
		<div style={{ flex: '1' }} />
		{storyFn()}
	</div>
);

storiesOf('Components|Footer', module)
	.addDecorator(stickyFooterDecorator)
	.add('with PoweredBy', () => (
		<Footer onClick={action('clicked')}>
			<Container>
				<PoweredBy />
			</Container>
		</Footer>
	))
	.add('with pre element', () => (
		<Footer>
			<Container>
				<Composer placeholder="Insert your text here" />
			</Container>
			<Container>
				<PoweredBy />
			</Container>
		</Footer>
	));
