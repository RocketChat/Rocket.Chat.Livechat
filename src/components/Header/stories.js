import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, color, text } from '@storybook/addon-knobs';

import Header, { Picture, Content, SubTitle, Title } from '.';
import Avatar from '../Avatar';
import bertieBartonAvatar from '../Avatar/bertieBarton.png';


storiesOf('Components|Header', module)
	.addDecorator(withKnobs)
	.add('with text content', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			Need Help?
		</Header>
	))
	.add('with agent', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Picture>
				<Avatar src={bertieBartonAvatar} />
			</Picture>

			<Content>
				<Title>{text('title', '@bertie.barton')}</Title>
				<SubTitle>{text('subtitle', 'Available')}</SubTitle>
			</Content>
		</Header>)
	)
;
