import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import * as Footer from '.';
import Composer from '../Composer';

const stickyFooterDecorator = (storyFn) => (
	<div
		style={{
			position: 'fixed',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'stretch',
			overflow: 'auto',
		}}
	>
		<div style={{ flex: '1' }} />
		{storyFn()}
	</div>
);

storiesOf('Components|Footer', module)
	.addDecorator(stickyFooterDecorator)
	.add('simple', () => (
		<Footer.Main>
			<Footer.Content>
				<Footer.PoweredBy />
			</Footer.Content>
		</Footer.Main>
	))
	.add('with Composer and options', () => (
		<Footer.Main>
			<Footer.Content>
				<Composer placeholder="Insert your text here" />
			</Footer.Content>
			<Footer.Content>
				<Footer.Options onClick={action('options clicked')} />
				<Footer.PoweredBy />
			</Footer.Content>
		</Footer.Main>
	))
;
