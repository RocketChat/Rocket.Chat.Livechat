import { Component } from 'preact';
import Avatar from '../Avatar';
import Header from '../Header';
import Footer from '../Footer';
import StatusIndicator from '../StatusIndicator';
import { createClassName } from '../helpers';
import { Consumer } from '../../store';
import NotificationsEnabledIcon from '../../icons/bell.svg';
import NotificationsDisabledIcon from '../../icons/bellOff.svg';
import MinimizeIcon from '../../icons/arrowDown.svg';
import RestoreIcon from '../../icons/arrowUp.svg';
import OpenWindowIcon from '../../icons/newWindow.svg';
import styles from './styles';


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
		className,
	}) => (
		<div className={createClassName(styles, 'screen', { rounded: !windowed }, [className])}>
			<Header color={color}>
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
				<Header.Actions>
					<Header.Action
						title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
						onClick={notificationsEnabled ? this.triggerDisableNotifications : this.triggerEnableNotifications}
					>
						{notificationsEnabled ?
							<NotificationsEnabledIcon width={20} /> :
							<NotificationsDisabledIcon width={20} />
						}
					</Header.Action>
					<Header.Action
						title={minimized ? 'Restore' : 'Minimize'}
						onClick={minimized ? this.triggerRestore : this.triggerMinimize}
					>
						{minimized ?
							<RestoreIcon width={20} /> :
							<MinimizeIcon width={20} />
						}
					</Header.Action>
					{!windowed && (
						<Header.Action title={'Open in a new window'} onClick={this.triggerOpenWindow}>
							<OpenWindowIcon width={20} />
						</Header.Action>
					)}
				</Header.Actions>
			</Header>

			{!minimized && (
				<main className={createClassName(styles, 'screen__main', { nopadding })}>
					{children}
				</main>
			)}

			{!minimized && (
				<Footer>
					{footer && (
						<Footer.Content>
							{footer}
						</Footer.Content>
					)}
					<Footer.Content>
						<Footer.PoweredBy />
					</Footer.Content>
				</Footer>
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

	render = (props) => (
		<Screen
			{...props}
			onEnableNotifications={this.handleEnableNotifications}
			onDisableNotifications={this.handleDisableNotifications}
			onMinimize={this.handleMinimize}
			onRestore={this.handleRestore}
			onOpenWindow={this.handleOpenWindow}
		/>
	)
}


export const ScreenConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			sound = {},
			dispatch = () => {},
		} = {}) => (
			<ScreenContainer
				ref={ref}
				{...props}
				notificationsEnabled={sound.enabled}
				minimized={false}
				windowed={false}
				sound={sound}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);

export default ScreenConnector;
