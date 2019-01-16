import { Component } from 'preact';
import Alert from '../Alert';
import Avatar from '../Avatar';
import Header from '../Header';
import Footer from '../Footer';
import StatusIndicator from '../StatusIndicator';
import Tooltip from '../Tooltip';
import { createClassName } from '../helpers';
import NotificationsEnabledIcon from '../../icons/bell.svg';
import NotificationsDisabledIcon from '../../icons/bellOff.svg';
import MinimizeIcon from '../../icons/arrowDown.svg';
import RestoreIcon from '../../icons/arrowUp.svg';
import OpenWindowIcon from '../../icons/newWindow.svg';
import styles from './styles';
import { PopoverContainer } from '../Popover';


class ScreenHeader extends Component {

	handleRef = (ref) => {
		this.headerRef = ref;
	}

	render = ({
		color,
		agent,
		title,
		notificationsEnabled,
		minimized = false,
		windowed = false,
		alerts,
		onDisableNotifications,
		onEnableNotifications,
		onRestore,
		onMinimize,
		onOpenWindow,
		onDismissAlert,
	}) => (
		<Header
			ref={this.handleRef}
			color={color}
			post={
				<Header.Post headerRef={this.headerRef}>
					{alerts && alerts.map((alert) => <Alert {...alert} onDismiss={onDismissAlert}>{alert.children}</Alert>)}
				</Header.Post>
			}
		>
			{agent && agent.avatar && (
				<Header.Picture>
					<Avatar src={agent.avatar.src} description={agent.avatar.description} />
				</Header.Picture>
			)}

			<Header.Content>
				<Header.Title>{agent ? agent.name : title}</Header.Title>
				{agent && (
					<Header.SubTitle className={createClassName(styles, 'screen__header-subtitle')}>
						<StatusIndicator status={agent.status} />
						<span>{agent.email}</span>
					</Header.SubTitle>
				)}
			</Header.Content>
			<Tooltip.Container>
				<Header.Actions>
					<Header.Action
						aria-label={notificationsEnabled ? I18n.t('Disable notifications') : I18n.t('Enable notifications')}
						onClick={notificationsEnabled ? onDisableNotifications : onEnableNotifications}
					>
						<Tooltip.Trigger content={notificationsEnabled ? I18n.t('Sound is on') : I18n.t('Sound is off')}>
							{notificationsEnabled ?
								<NotificationsEnabledIcon width={20} /> :
								<NotificationsDisabledIcon width={20} />
							}
						</Tooltip.Trigger>
					</Header.Action>
					<Header.Action
						aria-label={minimized ? I18n.t('Restore') : I18n.t('Minimize')}
						onClick={minimized ? onRestore : onMinimize}
					>
						<Tooltip.Trigger content={I18n.t('Minimize chat')}>
							{minimized ?
								<RestoreIcon width={20} /> :
								<MinimizeIcon width={20} />
							}
						</Tooltip.Trigger>
					</Header.Action>
					{!windowed && (
						<Header.Action aria-label={I18n.t('Open in a new window')} onClick={onOpenWindow}>
							<Tooltip.Trigger content={I18n.t('Expand chat')}>
								<OpenWindowIcon width={20} />
							</Tooltip.Trigger>
						</Header.Action>
					)}
				</Header.Actions>
			</Tooltip.Container>
		</Header>
	)
}


const ScreenFooter = ({
	footer,
	options,
	onChangeDepartment,
	onFinishChat,
	onRemoveUserData,
}) => (
	<PopoverContainer>
		<Footer>
			{footer && (
				<Footer.Content>
					{footer}
				</Footer.Content>
			)}
			<Footer.Content>
				{options && (
					<Footer.Options
						onChangeDepartment={onChangeDepartment}
						onFinishChat={onFinishChat}
						onRemoveUserData={onRemoveUserData}
					/>
				)}
				<Footer.PoweredBy />
			</Footer.Content>
		</Footer>
	</PopoverContainer>
);


export const Screen = ({
	color,
	agent,
	title,
	notificationsEnabled,
	minimized = false,
	windowed = false,
	nopadding = false,
	children,
	footer,
	options,
	className,
	alerts,
	modal,
	onEnableNotifications,
	onDisableNotifications,
	onMinimize,
	onRestore,
	onOpenWindow,
	onDismissAlert,
	onChangeDepartment,
	onFinishChat,
	onRemoveUserData,
}) => (
	<div className={createClassName(styles, 'screen', { rounded: !windowed }, [className])}>
		<ScreenHeader
			color={color}
			agent={agent}
			title={title}
			notificationsEnabled={notificationsEnabled}
			minimized={minimized}
			windowed={windowed}
			alerts={alerts}
			onEnableNotifications={onEnableNotifications}
			onDisableNotifications={onDisableNotifications}
			onMinimize={onMinimize}
			onRestore={onRestore}
			onOpenWindow={onOpenWindow}
			onDismissAlert={onDismissAlert}
		/>

		<main className={createClassName(styles, 'screen__main', { nopadding })}>
			{children}
		</main>

		{modal}

		<ScreenFooter
			footer={footer}
			options={options}
			onChangeDepartment={onChangeDepartment}
			onFinishChat={onFinishChat}
			onRemoveUserData={onRemoveUserData}
		/>
	</div>
);


export default Screen;
