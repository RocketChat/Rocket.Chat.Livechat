import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Avatar from '.';
import bertieBartonAvatar from './bertieBarton.png';

const avatarDescription = 'user description';

storiesOf('Components|Avatar', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<Avatar
			src={bertieBartonAvatar}
			small={boolean('small', false)}
			large={boolean('large', false)}
			description={text('description', avatarDescription)}
		/>
	))
	.add('small', () => (
		<Avatar
			src={bertieBartonAvatar}
			small={boolean('small', true)}
			large={boolean('large', false)}
			description={text('description', avatarDescription)}
		/>
	))
	.add('large', () => (
		<Avatar
			src={bertieBartonAvatar}
			small={boolean('small', true)}
			large={boolean('large', true)}
			description={text('description', avatarDescription)}
		/>
	))
	.add('as placeholder', () => (
		<Avatar
			small={boolean('small', false)}
			large={boolean('large', false)}
			description={text('description', avatarDescription)}
		/>
	))
	.add('with status indicator', () => (
		<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: 350 }}>
			<Avatar
				src={bertieBartonAvatar}
				small={boolean('small', true)}
				large={boolean('large', false)}
				description={text('description', avatarDescription)}
				status={text('status', 'offline')}
			/>
			<Avatar
				src={bertieBartonAvatar}
				small={boolean('small', false)}
				large={boolean('large', false)}
				description={text('description', avatarDescription)}
				status={text('status', 'away')}
			/>
			<Avatar
				src={bertieBartonAvatar}
				small={boolean('small', true)}
				large={boolean('large', true)}
				description={text('description', avatarDescription)}
				status={text('status', 'busy')}
			/>
			<Avatar
				small={boolean('small', false)}
				large={boolean('large', true)}
				description={text('description', avatarDescription)}
				status={text('status', 'online')}
			/>
			<Avatar
				small={boolean('small', false)}
				large={boolean('large', true)}
				description={text('description', avatarDescription)}
				status={text('status', 'online')}
				statusBorderColor={text('statusBorderColor', '#000')}
			/>
		</div>
	));
