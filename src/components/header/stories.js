import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header, { Content, Title, SubTitle } from '.';
import Avatar from '../Avatar';
import bertieBartonAvatar from '../Avatar/bertieBarton.png';

storiesOf('Components|Header', module)
	.add('with text content', () => <Header onClick={action('clicked')}>Need Help?</Header>)
	.add('with agent', () => (
		<Header onClick={action('clicked')}>
			<Avatar src={bertieBartonAvatar} />
			<Content>
				<Title>@bertie.barton</Title>
				<SubTitle>Available</SubTitle>
			</Content>
		</Header>)
	);
