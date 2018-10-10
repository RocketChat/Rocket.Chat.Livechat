import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, color, text } from '@storybook/addon-knobs';

import Header, { Picture, Content, SubTitle, Title, Actions, Action } from '.';
import Avatar from '../Avatar';
import StatusIndicator, { statuses } from '../StatusIndicator';
import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrow.svg';
import NewWindow from 'icons/newWindow.svg';
import { select } from '@storybook/addon-knobs/dist/vue';


storiesOf('Components|Header', module)
	.addDecorator(withKnobs)
	.add('with text content', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Content>
				Need Help?
			</Content>
		</Header>
	))
	.add('with picture', () => (
		<Header color={color('color', '#175CC4')} onClick={action('clicked')}>
			<Picture>
				<Avatar />
			</Picture>

			<Content>
				<Title>{text('title', '@bertie.barton')}</Title>
				<SubTitle>
					<StatusIndicator status={select('status', statuses, 'online')} />
					<span style={{ margin: '5px' }}>{text('subtitle', 'Available')}</span>
				</SubTitle>
			</Content>
		</Header>)
	)
	.add('with actions', () => (
		<Header color={color('color', '#175CC4')}>
			<Picture>
				<Avatar />
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
