import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Composer from '../Composer';
import { PopoverContainer } from '../Popover';
import Footer from '.';


const bottomWithPopoverContainer = (storyFn) => (
	<div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
		<PopoverContainer>
			<div style={{ flex: '1' }} />
			{storyFn()}
		</PopoverContainer>
	</div>
);

storiesOf('Components|Footer', module)
	.addDecorator(bottomWithPopoverContainer)
	.add('simple', () => (
		<Footer>
			<Footer.Content>
				<Footer.PoweredBy />
			</Footer.Content>
		</Footer>
	))
	.add('with Composer and options', () => (
		<Footer>
			<Footer.Content>
				<Composer placeholder="Insert your text here" />
			</Footer.Content>
			<Footer.Content>
				<Footer.Options onChangeDepartment={action('change-department')} onFinishChat={action('finish-chat')} />
				<Footer.PoweredBy />
			</Footer.Content>
		</Footer>
	))
;
