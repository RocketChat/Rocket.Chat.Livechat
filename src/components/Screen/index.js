import { Component } from 'preact';
import Alert from '../Alert';
import Avatar from '../Avatar';
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
						<Tooltip.Trigger content={I18n.t('Minimize chat')}>
							<Header.Action
								aria-label={minimized ? I18n.t('Restore') : I18n.t('Minimize')}
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
							<Header.Action aria-label={I18n.t('Open in a new window')} onClick={onOpenWindow}>
								<OpenWindowIcon width={20} />
							</Header.Action>
						</Tooltip.Trigger>
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
);


const ScreenInner = ({
	agent,
	title,
	notificationsEnabled,
	minimized,
	expanded,
	windowed,
	nopadding,
	children,
	footer,
	options,
	className,
	alerts,
	modal,
	onDismissAlert,
	onEnableNotifications,
	onDisableNotifications,
	onMinimize,
	onRestore,
	onOpenWindow,
	onChangeDepartment,
	onFinishChat,
	onRemoveUserData,
}) => (
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
		</PopoverContainer>
	</div>
);


export const Screen = ({
	theme = {},
	agent,
	title,
	notificationsEnabled,
	minimized = false,
	expanded = false,
	windowed = false,
	nopadding = false,
	children,
	footer,
	options,
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
	onChangeDepartment,
	onFinishChat,
	onRemoveUserData,
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
		<ScreenInner
			agent={agent}
			title={title}
			notificationsEnabled={notificationsEnabled}
			minimized={minimized}
			expanded={expanded}
			windowed={windowed}
			nopadding={nopadding}
			children={children}
			footer={footer}
			options={options}
			className={className}
			alerts={alerts}
			modal={modal}
			onDismissAlert={onDismissAlert}
			onEnableNotifications={onEnableNotifications}
			onDisableNotifications={onDisableNotifications}
			onMinimize={onMinimize}
			onRestore={onRestore}
			onOpenWindow={onOpenWindow}
			onChangeDepartment={onChangeDepartment}
			onFinishChat={onFinishChat}
			onRemoveUserData={onRemoveUserData}
		/>

		<ChatButton
			open={!minimized}
			onClick={minimized ? onRestore : onMinimize}
			className={createClassName(styles, 'screen__chat-button')}
			badge={unread}
		/>

		{sound && <Sound src={sound.src} play={sound.play} onStop={onSoundStop} />}
	</div>
);


export default Screen;
