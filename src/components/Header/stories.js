import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, color, select, text, boolean } from '@storybook/addon-knobs';

import Header, { Picture, Content, SubTitle, Title, Actions, Action, CustomField, Post } from '.';
import Avatar from '../Avatar';
import StatusIndicator, { statuses } from '../StatusIndicator';
import { Alert } from '../Alert';
import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrowDown.svg';
import NewWindow from 'icons/newWindow.svg';
import bertieBartonAvatar from '../Avatar/bertieBarton.png';


storiesOf('Components|Header', module)
	.addDecorator(withKnobs)
	.add('with text content', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Content>
				{text('text', 'Need Help?')}
			</Content>
		</Header>
	))
	.add('with long text content', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Content>
				{text('text', 'Need Help? '.repeat(100))}
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
	.add('with multiple alerts', () => (
		<Header
			color={color('color', '#175CC4')}
			post={
				<Post>
					<Alert
						success={boolean('success', true)}
						onDismiss={action('clicked')}
					>
						{text('text', 'Success')}
					</Alert>
					<Alert
						warning={boolean('warning', true)}
						onDismiss={action('clicked')}
					>
						{text('text', 'Warning')}
					</Alert>
					<Alert
						error={boolean('error', true)}
						onDismiss={action('clicked')}
					>
						{text('text', 'Error')}
					</Alert>
					<Alert
						error={boolean('error', true)}
						color={color('color', '#175CC4')}
						onDismiss={action('clicked')}
					>
						{text('text', 'Custom color')}
					</Alert>
				</Post>
			}
		>
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
	.add('for user chat with custom fields', () => (
		<Header color={color('color', '#175CC4')}>
			<Picture>
				<Avatar src={bertieBartonAvatar} />
			</Picture>

			<Content>
				<Title>{text('title', '@bertie.barton')}</Title>
				<SubTitle>
					<StatusIndicator status={select('status', statuses, 'online')} />
					<span style={{ margin: '5px' }}>{text('email', 'bertie.barton@rocket.chat')}</span>
				</SubTitle>
				<CustomField>
					<span style={{ margin: '5px' }}>{text('custom', '+ 55 42423 24242')}</span>
				</CustomField>
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
