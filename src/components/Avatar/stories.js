import centered from '@storybook/addon-centered/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Avatar from '.';
import bertieBartonAvatar from './bertieBarton.png';


const avatarDescription = 'user description';
const avatarStatuses = {
	None: null,
	OffLine: 'offline',
	Away: 'away',
	Busy: 'busy',
	OnLine: 'online',
};

storiesOf('Components|Avatar', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('large', () => (
		<Avatar
			src={text('src', bertieBartonAvatar)}
			small={boolean('small', false)}
			large={boolean('large', true)}
			description={text('description', avatarDescription)}
			status={select('status', avatarStatuses, null)}
		/>
	))
	.add('medium', () => (
		<Avatar
			src={text('src', bertieBartonAvatar)}
			small={boolean('small', false)}
			large={boolean('large', false)}
			description={text('description', avatarDescription)}
			status={select('status', avatarStatuses, null)}
		/>
	))
	.add('small', () => (
		<Avatar
			src={text('src', bertieBartonAvatar)}
			small={boolean('small', true)}
			large={boolean('large', false)}
			description={text('description', avatarDescription)}
			status={select('status', avatarStatuses, null)}
		/>
	))
	.add('as placeholder', () => (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
			<Avatar
				src={text('src', '')}
				large
				description={text('description', avatarDescription)}
				status={select('status', avatarStatuses, null)}
				style={{ margin: '0.5rem' }}
			/>
			<Avatar
				src={text('src', '')}
				description={text('description', avatarDescription)}
				status={select('status', avatarStatuses, null)}
				style={{ margin: '0.5rem' }}
			/>
			<Avatar
				src={text('src', '')}
				small
				description={text('description', avatarDescription)}
				status={select('status', avatarStatuses, null)}
				style={{ margin: '0.5rem' }}
			/>
		</div>
	))
	.add('with status indicator', () => (
		<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
			<Avatar
				src={text('src', bertieBartonAvatar)}
				large
				description={text('description', avatarDescription)}
				status={'offline'}
				style={{ margin: '0.5rem' }}
			/>
			<Avatar
				src={text('src', bertieBartonAvatar)}
				large
				description={text('description', avatarDescription)}
				status={'away'}
				style={{ margin: '0.5rem' }}
			/>
			<Avatar
				src={text('src', bertieBartonAvatar)}
				large
				description={text('description', avatarDescription)}
				status={'busy'}
				style={{ margin: '0.5rem' }}
			/>
			<Avatar
				src={text('src', bertieBartonAvatar)}
				large
				description={text('description', avatarDescription)}
				status={'online'}
				style={{ margin: '0.5rem' }}
			/>
		</div>
	));
