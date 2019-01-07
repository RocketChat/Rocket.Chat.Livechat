import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Composer from '../Composer';
import { PopoverContainer } from '../Popover';
import Footer from '.';


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
		<Footer>
			<Footer.Content>
				<Footer.PoweredBy />
			</Footer.Content>
		</Footer>
	))
	.add('with Composer and options', () => (
		<PopoverContainer>
			<Footer>
				<Footer.Content>
					<Composer placeholder="Insert your text here" />
				</Footer.Content>
				<Footer.Content>
					<Footer.Options onChangeDepartment={action('change-department')} onFinishChat={action('finish-chat')} />
					<Footer.PoweredBy />
				</Footer.Content>
			</Footer>
		</PopoverContainer>
	))
;
