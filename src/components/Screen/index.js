import { Component } from 'preact';
import Alert from '../Alert';
import Avatar from '../Avatar';
import Header from '../Header';
import Footer from '../Footer';
import StatusIndicator from '../StatusIndicator';
import Tooltip from '../Tooltip';
import { createClassName } from '../helpers';
import { Consumer } from '../../store';
import NotificationsEnabledIcon from '../../icons/bell.svg';
import NotificationsDisabledIcon from '../../icons/bellOff.svg';
import MinimizeIcon from '../../icons/arrowDown.svg';
import RestoreIcon from '../../icons/arrowUp.svg';
import OpenWindowIcon from '../../icons/newWindow.svg';
import styles from './styles';
import { PopoverContainer } from '../Popover';


export class Screen extends Component {
	triggerEnableNotifications = () => {
		const { onEnableNotifications } = this.props;
		onEnableNotifications && onEnableNotifications();
	}

	triggerDisableNotifications = () => {
		const { onDisableNotifications } = this.props;
		onDisableNotifications && onDisableNotifications();
	}

	triggerRestore = () => {
		const { onRestore } = this.props;
		onRestore && onRestore();
	}

	triggerMinimize = () => {
		const { onMinimize } = this.props;
		onMinimize && onMinimize();
	}

	triggerOpenWindow = () => {
		const { onOpenWindow } = this.props;
		onOpenWindow && onOpenWindow();
	}

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
		nopadding = false,
		children,
		footer,
		options,
		onChangeDepartment,
		onFinishChat,
		onRemoveUserData,
		onDismissAlert,
		className,
		alerts,
	}) => (
		<div className={createClassName(styles, 'screen', { rounded: !windowed }, [className])}>
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
							onClick={notificationsEnabled ? this.triggerDisableNotifications : this.triggerEnableNotifications}
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
							onClick={minimized ? this.triggerRestore : this.triggerMinimize}
						>
							<Tooltip.Trigger content={I18n.t('Minimize chat')}>
								{minimized ?
									<RestoreIcon width={20} /> :
									<MinimizeIcon width={20} />
								}
							</Tooltip.Trigger>
						</Header.Action>
						{!windowed && (
							<Header.Action aria-label={I18n.t('Open in a new window')} onClick={this.triggerOpenWindow}>
								<Tooltip.Trigger content={I18n.t('Expand chat')}>
									<OpenWindowIcon width={20} />
								</Tooltip.Trigger>
							</Header.Action>
						)}
					</Header.Actions>
				</Tooltip.Container>
			</Header>

			{!minimized && (
				<main className={createClassName(styles, 'screen__main', { nopadding })}>
					{children}
				</main>
			)}

			{!minimized && (
				<PopoverContainer>
					<Footer>
						{footer && (
							<Footer.Content>
								{footer}
							</Footer.Content>
						)}
						<Footer.Content>
							{options && (
								<Footer.Options onChangeDepartment={onChangeDepartment} onFinishChat={onFinishChat} onRemoveUserData={onRemoveUserData} />
							)}
							<Footer.PoweredBy />
						</Footer.Content>
					</Footer>
				</PopoverContainer>
			)}
		</div>
	);
}


export class ScreenContainer extends Component {
	handleEnableNotifications = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, enabled: true } });
	}

	handleDisableNotifications = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, enabled: false } });
	}

	handleDismissAlert = (id) => {
		const { dispatch, alerts = [] } = this.props;
		dispatch({ alerts: alerts.filter((alert) => alert.id !== id) });
	}

	render = (props) => (
		<Screen
			{...props}
			onEnableNotifications={this.handleEnableNotifications}
			onDisableNotifications={this.handleDisableNotifications}
			onMinimize={this.handleMinimize}
			onRestore={this.handleRestore}
			onOpenWindow={this.handleOpenWindow}
			onDismissAlert={this.handleDismissAlert}
		/>
	)
}


export const ScreenConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			sound = {},
			alerts = [],
			dispatch = () => {},
		} = {}) => (
			<ScreenContainer
				ref={ref}
				{...props}
				notificationsEnabled={sound.enabled}
				minimized={false}
				windowed={false}
				sound={sound}
				alerts={alerts}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);

export default ScreenConnector;
