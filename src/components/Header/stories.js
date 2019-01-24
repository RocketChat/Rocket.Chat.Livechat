import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, text } from '@storybook/addon-knobs';
import Header, { Picture, Content, SubTitle, Title, Actions, Action, Post, CustomField } from '.';
import Avatar from '../Avatar';
import { Alert } from '../Alert';
import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrowDown.svg';
import NewWindow from 'icons/newWindow.svg';
import bertieBartonAvatar from '../Avatar/bertieBarton.png';


storiesOf('Components|Header', module)
	.addDecorator(withKnobs)
	.add('with text content', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
			onClick={action('clicked')}
		>
			<Content>
				{text('text', 'Need Help?')}
			</Content>
		</Header>
	))
	.add('with long text content', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
			onClick={action('clicked')}
		>
			<Content>
				{text('text', 'Need Help? '.repeat(100))}
			</Content>
		</Header>
	))
	.add('with title and subtitle', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
			onClick={action('clicked')}
		>
			<Content>
				<Title>{text('title', 'Rocket.Chat')}</Title>
				<SubTitle>{text('subtitle', 'Livechat')}</SubTitle>
			</Content>
		</Header>
	))
	.add('with picture', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
			onClick={action('clicked')}
		>
			<Picture>
				<Bell width={20} />
			</Picture>

			<Content>
				{text('text', 'Notification settings')}
			</Content>
		</Header>
	))
	.add('with actions', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
			onClick={action('clicked')}
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
	.add('with multiple alerts', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
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
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
		>
			<Picture>
				<Avatar src={bertieBartonAvatar} status={'busy'} />
			</Picture>

			<Content>
				<Title>{text('title', '@bertie.barton')}</Title>
				<SubTitle>
					{text('subtitle', 'bertie.barton@rocket.chat')}
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
	.add('with custom field', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
			large
		>
			<Picture>
				<Avatar src={bertieBartonAvatar} large status={'away'} />
			</Picture>

			<Content>
				<Title>{text('title', 'Bertie Barton')}</Title>
				<SubTitle>
					{text('subtitle', 'bertie.barton@rocket.chat')}
				</SubTitle>
				<CustomField>
					{text('custom', '+ 55 42423 24242')}
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
	.add('with custom field and alert', () => (
		<Header
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
			}}
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
				</Post>
			}
			large
		>
			<Picture>
				<Avatar src={bertieBartonAvatar} large status={'online'} />
			</Picture>

			<Content>
				<Title>{text('title', 'Bertie Barton')}</Title>
				<SubTitle>
					{text('subtitle', 'bertie.barton@rocket.chat')}
				</SubTitle>
				<CustomField>
					{text('custom', '+ 55 42423 24242')}
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
	.add('with theme', () => (
		<Header
			theme={{
				color: color('theme.color', 'darkred'),
				fontColor: color('theme.fontColor', 'peachpuff'),
			}}
			large
		>
			<Picture>
				<Avatar src={bertieBartonAvatar} large status={'away'} />
			</Picture>

			<Content>
				<Title>{text('title', 'Bertie Barton')}</Title>
				<SubTitle>
					{text('subtitle', 'bertie.barton@rocket.chat')}
				</SubTitle>
				<CustomField>
					{text('custom', '+ 55 42423 24242')}
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
