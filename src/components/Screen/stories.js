import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, object, text } from '@storybook/addon-knobs';

import { screenCentered } from '../../helpers.stories';
import { FooterOptions } from '../Footer';
import Menu from '../Menu';
import { Screen } from '.';


const alerts = [
	{ id: 1, children: 'Success alert', success: true },
	{ id: 2, children: 'Warning alert', warning: true, timeout: 0 },
	{ id: 3, children: 'Error alert', error: true, timeout: 1000 },
	{ id: 4, children: 'Custom colored alert', color: '#000', timeout: 5000 },
];

storiesOf('Components|Screen', module)
	.addDecorator(withKnobs)
	.addDecorator(screenCentered)
	.add('normal', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	))
	.add('minimized', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', true)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	))
	.add('expanded', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', true)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	))
	.add('windowed', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', true)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	))
	.add('with agent (email)', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			agent={object('agent', {
				name: 'Guilherme Gazzo',
				status: 'away',
				email: 'guilherme.gazzo@rocket.chat',
				avatar: {
					description: 'guilherme.gazzo',
					src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=46',
				},
			})}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	))
	.add('with agent (phone)', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			agent={object('agent', {
				name: 'Guilherme Gazzo',
				status: 'away',
				phone: '+ 55 42423 24242',
				avatar: {
					description: 'guilherme.gazzo',
					src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=46',
				},
			})}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	))
	.add('with agent', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			agent={object('agent', {
				name: 'Guilherme Gazzo',
				status: 'away',
				email: 'guilherme.gazzo@rocket.chat',
				phone: '+ 55 42423 24242',
				avatar: {
					description: 'guilherme.gazzo',
					src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=46',
				},
			})}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	))
	.add('with multiple alerts', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			alerts={object('alerts', alerts)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
			onDismissAlert={action('dismiss alert')}
		>
			<Screen.Content>
				{text('content', 'Content')}
			</Screen.Content>
		</Screen>
	));
storiesOf('Components|Screen/Footer', module)
	.addDecorator(withKnobs)
	.addDecorator(screenCentered)
	.add('empty', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content />
			<Screen.Footer />
		</Screen>
	))
	.add('with children', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content />
			<Screen.Footer>
				{text('content', 'Lorem ipsum dolor sit amet, his id atqui repudiare.')}
			</Screen.Footer>
		</Screen>
	))
	.add('with options', () => (
		<Screen
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			expanded={boolean('expanded', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			<Screen.Content />
			<Screen.Footer
				options={
					<FooterOptions>
						<Menu.Group>
							<Menu.Item onClick={action('changeDepartment')}>{I18n.t('Change department')}</Menu.Item>
							<Menu.Item onClick={action('removeUserData')}>{I18n.t('Forget/Remove my data')}</Menu.Item>
							<Menu.Item danger onClick={action('finishChat')}>{I18n.t('Finish this chat')}</Menu.Item>
						</Menu.Group>
					</FooterOptions>
				}
			/>
		</Screen>
	));
