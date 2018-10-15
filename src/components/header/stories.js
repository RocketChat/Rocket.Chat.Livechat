import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, color, select, text } from '@storybook/addon-knobs';

import Header, { Picture, Content, SubTitle, Title, Actions, Action } from '.';

import Avatar from '../Avatar';
import StatusIndicator, { statuses } from '../StatusIndicator';
import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrow.svg';
import NewWindow from 'icons/newWindow.svg';
import bertieBartonAvatar from '../Avatar/bertieBarton.png';
import centered from '@storybook/addon-centered';



storiesOf('Components|Header', module)
	.addDecorator(withKnobs)
	.add('with text content', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Content>
				{text('text', 'Need Help?')}
			</Content>
		</Header>
	))
	.add('with title and subtitle', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Content>
				<Title>{text('title', 'Rocket.Chat')}</Title>
				<SubTitle>{text('subtitle', 'Livechat')}</SubTitle>
			</Content>
		</Header>
	))
	.add('with picture', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Picture>
				<Bell width={20} />
			</Picture>

			<Content>
				{text('text', 'Notification settings')}
			</Content>
		</Header>
	))
	.add('with actions', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Content>
				{text('text', 'Chat finished')}
			</Content>

			<Actions>
				<Action onClick={action('notifications')}>
					<Bell width={20} />
				</Action>
				<Action onClick={action('minimize')}>
					<Arrow width={20} />
				</Action>
			</Actions>
		</Header>
	))
	.add('for user chat', () => (
		<Header color={color('color', '#175CC4')}>
			<Picture>
				<Avatar src={bertieBartonAvatar} />
			</Picture>

			<Content>
				<Title>{text('title', '@bertie.barton')}</Title>
				<SubTitle>
					<StatusIndicator status={select('status', statuses, 'online')} />
					<span style={{ margin: '5px' }}>{text('subtitle', 'Available')}</span>
				</SubTitle>
			</Content>

			<Actions>
				<Action onClick={action('notifications')}>
					<Bell width={20} />
				</Action>
				<Action onClick={action('minimize')}>
					<Arrow width={20} />
				</Action>
				<Action onClick={action('fullscreen')}>
					<NewWindow width={20} />
				</Action>
			</Actions>
		</Header>
	))
;
