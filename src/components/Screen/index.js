import { Component, h } from 'preact';
import { useEffect } from 'preact/hooks';

import I18n from '../../i18n';
import MinimizeIcon from '../../icons/arrowDown.svg';
import RestoreIcon from '../../icons/arrowUp.svg';
import NotificationsEnabledIcon from '../../icons/bell.svg';
import NotificationsDisabledIcon from '../../icons/bellOff.svg';
import ChatIcon from '../../icons/chat.svg';
import CloseIcon from '../../icons/close.svg';
import OpenWindowIcon from '../../icons/newWindow.svg';
import { Alert } from '../Alert';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Footer, FooterContent, PoweredBy } from '../Footer';
import Header from '../Header';
import { PopoverContainer } from '../Popover';
import { Sound } from '../Sound';
import Tooltip from '../Tooltip';
import { createClassName } from '../helpers';
import styles from './styles.scss';

class ScreenHeader extends Component {
	largeHeader = () => {
		const { agent } = this.props;
		return !!(agent && agent.email && agent.phone);
	}

	headerTitle = () => {
		const { agent, queueInfo, title } = this.props;
		if (agent && agent.name) {
			return agent.name;
		}

		if (queueInfo && queueInfo.spot && queueInfo.spot > 0) {
			return I18n.t('Waiting queue...');
		}

		return title;
	}

	render = ({
		alerts,
		agent,
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
				<Header.Title>{this.headerTitle()}</Header.Title>
				{agent && agent.email && (
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
							{notificationsEnabled
								? <NotificationsEnabledIcon width={20} height={20} />
								: <NotificationsDisabledIcon width={20} height={20} />
							}
						</Header.Action>
					</Tooltip.Trigger>
					{(expanded || !windowed) && (
						<Tooltip.Trigger content={minimized ? I18n.t('Restore chat') : I18n.t('Minimize chat')}>
							<Header.Action
								aria-label={minimized ? I18n.t('Restore chat') : I18n.t('Minimize chat')}
								onClick={minimized ? onRestore : onMinimize}
							>
								{minimized
									? <RestoreIcon width={20} height={20} />
									: <MinimizeIcon width={20} height={20} />
								}
							</Header.Action>
						</Tooltip.Trigger>
					)}
					{(!expanded && !windowed) && (
						<Tooltip.Trigger content={I18n.t('Expand chat')} placement='bottom-left'>
							<Header.Action aria-label={I18n.t('Expand chat')} onClick={onOpenWindow}>
								<OpenWindowIcon width={20} height={20} />
							</Header.Action>
						</Tooltip.Trigger>
					)}
				</Header.Actions>
			</Tooltip.Container>
		</Header>
	)
}


export const ScreenContent = ({ children, nopadding, triggered = false }) => (
	<main className={createClassName(styles, 'screen__main', { nopadding, triggered })}>
		{children}
	</main>
);


export const ScreenFooter = ({ children, options, limit }) => (
	<Footer>
		{children && (
			<FooterContent>
				{children}
			</FooterContent>
		)}
		<FooterContent>
			{options}
			{limit}
			<PoweredBy />
		</FooterContent>
	</Footer>
);

const ChatButton = ({
	text,
	minimized,
	badge,
	onClick,
	triggered = false,
	agent,
}) => (
	<Button
		icon={minimized || triggered ? <ChatIcon /> : <CloseIcon />}
		badge={badge}
		onClick={onClick}
		className={createClassName(styles, 'screen__chat-button')}
		img={triggered && agent && agent.avatar.src}
	>
		{text}
	</Button>
);

const CssVar = ({ theme }) => {
	useEffect(() => {
		if (window.CSS && CSS.supports('color', 'var(--color)')) {
			return;
		}
		let mounted = true;
		(async () => {
			const { default: cssVars } = await import('css-vars-ponyfill');
			if (!mounted) {
				return;
			}
			cssVars({
				variables: {
					'--color': theme.color,
					'--font-color': theme.fontColor,
					'--icon-color': theme.iconColor,
				},
			});
		})();
		return () => {
			mounted = false;
		};
	}, [theme]);

	return <style>{`
		.${ styles.screen } {
			${ theme.color ? `--color: ${ theme.color };` : '' }
			${ theme.fontColor ? `--font-color: ${ theme.fontColor };` : '' }
			${ theme.iconColor ? `--icon-color: ${ theme.iconColor };` : '' }
		}
	`}</style>;
};

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
	queueInfo,
	dismissNotification,
	triggered = false,
}) => (
	<div className={createClassName(styles, 'screen', { minimized, expanded, windowed, triggered })}>
		<CssVar theme={theme} />
		{triggered && <Button onClick={onMinimize} className={createClassName(styles, 'screen__chat-close-button')} icon={<CloseIcon />}>Close</Button>}
		<div className={createClassName(styles, 'screen__inner', { fitTextSize: triggered }, [className])}>
			<PopoverContainer>
				{!triggered && <ScreenHeader
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
					queueInfo={queueInfo}
				/>}

				{modal}
				{children}
			</PopoverContainer>
		</div>

		<ChatButton
			agent={agent}
			triggered={triggered}
			text={title}
			badge={unread}
			minimized={minimized}
			onClick={minimized ? onRestore : onMinimize}
		/>

		{sound && <Sound src={sound.src} play={sound.play} onStop={onSoundStop} dismissNotification={dismissNotification} />}
	</div>
);


Screen.Content = ScreenContent;
Screen.Footer = ScreenFooter;


export default Screen;
