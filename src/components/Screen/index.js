import { Component } from 'preact';
import { Alert } from '../Alert';
import { Avatar } from '../Avatar';
import ChatButton from '../ChatButton';
import Header from '../Header';
import Footer from '../Footer';
import { PopoverContainer } from '../Popover';
import Sound from '../Sound';
import Tooltip from '../Tooltip';
import { createClassName } from '../helpers';
import NotificationsEnabledIcon from '../../icons/bell.svg';
import NotificationsDisabledIcon from '../../icons/bellOff.svg';
import MinimizeIcon from '../../icons/arrowDown.svg';
import RestoreIcon from '../../icons/arrowUp.svg';
import OpenWindowIcon from '../../icons/newWindow.svg';
import styles from './styles';


class ScreenHeader extends Component {
	largeHeader = () => {
		const { agent } = this.props;
		return !!(agent && agent.email && agent.phone);
	}

	render = ({
		alerts,
		agent,
		title,
		notificationsEnabled,
		minimized,
		expanded,
		windowed,
		onDismissAlert,
		onEnableNotifications,
		onDisableNotifications,
		onMinimize,
		onRestore,
		onOpenWindow,
	}) => (
		<Header
			ref={this.handleRef}
			post={
				<Header.Post>
					{alerts && alerts.map((alert) => <Alert {...alert} onDismiss={onDismissAlert}>{alert.children}</Alert>)}
				</Header.Post>
			}
			large={this.largeHeader()}
		>
			{agent && agent.avatar && (
				<Header.Picture>
					<Avatar
						src={agent.avatar.src}
						description={agent.avatar.description}
						status={agent.status}
						large={this.largeHeader()}
						statusBorder
					/>
				</Header.Picture>
			)}

			<Header.Content>
				<Header.Title>{agent ? agent.name : title}</Header.Title>
				{agent && (
					<Header.SubTitle>{agent.email}</Header.SubTitle>
				)}
				{agent && agent.phone && (
					<Header.CustomField>{agent.phone}</Header.CustomField>
				)}
			</Header.Content>
			<Tooltip.Container>
				<Header.Actions>
					<Tooltip.Trigger content={notificationsEnabled ? I18n.t('Sound is on') : I18n.t('Sound is off')}>
						<Header.Action
							aria-label={notificationsEnabled ? I18n.t('Disable notifications') : I18n.t('Enable notifications')}
							onClick={notificationsEnabled ? onDisableNotifications : onEnableNotifications}
						>
							{notificationsEnabled ?
								<NotificationsEnabledIcon width={20} /> :
								<NotificationsDisabledIcon width={20} />
							}
						</Header.Action>
					</Tooltip.Trigger>
					{(expanded || !windowed) && (
						<Tooltip.Trigger content={minimized ? I18n.t('Restore chat') : I18n.t('Minimize chat')}>
							<Header.Action
								aria-label={minimized ? I18n.t('Restore chat') : I18n.t('Minimize chat')}
								onClick={minimized ? onRestore : onMinimize}
							>
								{minimized ?
									<RestoreIcon width={20} /> :
									<MinimizeIcon width={20} />
								}
							</Header.Action>
						</Tooltip.Trigger>
					)}
					{(!expanded && !windowed) && (
						<Tooltip.Trigger content={I18n.t('Expand chat')} placement="bottom-left">
							<Header.Action aria-label={I18n.t('Expand chat')} onClick={onOpenWindow}>
								<OpenWindowIcon width={20} />
							</Header.Action>
						</Tooltip.Trigger>
					)}
				</Header.Actions>
			</Tooltip.Container>
		</Header>
	)
}


export const ScreenContent = ({ children, nopadding }) => (
	<main className={createClassName(styles, 'screen__main', { nopadding })}>
		{children}
	</main>
);


export const ScreenFooter = ({ children, options }) => (
	<Footer>
		{children && (
			<Footer.Content>
				{children}
			</Footer.Content>
		)}
		<Footer.Content>
			{options}
			<Footer.PoweredBy />
		</Footer.Content>
	</Footer>
);


export const Screen = ({
	theme = {},
	agent,
	title,
	notificationsEnabled,
	minimized = false,
	expanded = false,
	windowed = false,
	children,
	className,
	alerts,
	modal,
	unread,
	sound,
	onDismissAlert,
	onEnableNotifications,
	onDisableNotifications,
	onMinimize,
	onRestore,
	onOpenWindow,
	onSoundStop,
}) => (
	<div className={createClassName(styles, 'screen', { minimized, expanded, windowed })}>
		<style>{`
			.${ styles.screen } {
				${ theme.color ? `--color: ${ theme.color };` : '' }
				${ theme.fontColor ? `--font-color: ${ theme.fontColor };` : '' }
				${ theme.iconColor ? `--icon-color: ${ theme.iconColor };` : '' }
			}
		`}</style>

		<div className={createClassName(styles, 'screen__inner', {}, [className])}>
			<PopoverContainer>
				<ScreenHeader
					alerts={alerts}
					agent={agent}
					title={title}
					notificationsEnabled={notificationsEnabled}
					minimized={minimized}
					expanded={expanded}
					windowed={windowed}
					onDismissAlert={onDismissAlert}
					onEnableNotifications={onEnableNotifications}
					onDisableNotifications={onDisableNotifications}
					onMinimize={onMinimize}
					onRestore={onRestore}
					onOpenWindow={onOpenWindow}
				/>

				{modal}
				{children}
			</PopoverContainer>
		</div>

		<ChatButton
			text={title}
			open={!minimized}
			onClick={minimized ? onRestore : onMinimize}
			className={createClassName(styles, 'screen__chat-button')}
			badge={unread}
		/>

		{sound && <Sound src={sound.src} play={sound.play} onStop={onSoundStop} />}
	</div>
);


Screen.Content = ScreenContent;
Screen.Footer = ScreenFooter;


export default Screen;
