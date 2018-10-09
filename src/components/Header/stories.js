import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { color, withKnobs } from '@storybook/addon-knobs';
import Header from '.';
import Avatar from '../Avatar';
import bertieBartonAvatar from '../Avatar/bertieBarton.png';
import centered from '@storybook/addon-centered';


storiesOf('Components|Header', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('with text content', () => <Header onClick={action('clicked')}>Need Help?</Header>)

	.add('with agent', () => (
		<Header onClick={action('clicked')}>
			<Header.Avatar><Avatar src={bertieBartonAvatar} /></Header.Avatar>
			<Header.Content>
				<Header.Title>@bertie.barton</Header.Title>
				<Header.SubTitle>Available</Header.SubTitle>
			</Header.Content>
		</Header>)
	)
	.add('custom color', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Header.Avatar><Avatar src={bertieBartonAvatar} /></Header.Avatar>
			<Header.Content>
				<Header.Title>@bertie.barton</Header.Title>
				<Header.SubTitle>Available</Header.SubTitle>
			</Header.Content>
		</Header>)
	);
