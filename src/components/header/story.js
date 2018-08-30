import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header, { Content, Title, SubTitle } from './';
import Avatar from '../Avatar';

import c from '../../../stories/helper/center';

storiesOf('Header', module).add('render simple header', () => c(<Header onClick={action('clicked')}>Need Help?</Header>));

storiesOf('Header', module).add('render header with agent', () => c(
	<Header onClick={action('clicked')}>
		<Avatar /><Content>
			<Title>@bertie.barton</Title>
			<SubTitle>bla bla</SubTitle>
		</Content>
	</Header>));
