import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header from '.';
import Avatar from '../Avatar';
import bertieBartonAvatar from '../Avatar/bertieBarton.png';

storiesOf('Components|Header', module)
	.add('with text content', () => <Header onClick={action('clicked')}>Need Help?</Header>)
	.add('with agent', () => (
		<Header onClick={action('clicked')}>
			<Header.Avatar><Avatar src={bertieBartonAvatar} /></Header.Avatar>
			<Header.Content>
				<Header.Title>@bertie.barton</Header.Title>
				<Header.SubTitle>Available</Header.SubTitle>
			</Header.Content>
		</Header>)
	);
