import { Component } from 'preact';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { createClassName } from '../../../components/helpers';
import NotificationsEnabledIcon from '../../../icons/bell.svg';
import NotificationsDisabledIcon from '../../../icons/bellOff.svg';
import MinimizeIcon from '../../../icons/arrowDown.svg';
import RestoreIcon from '../../../icons/arrowUp.svg';
import OpenWindowIcon from '../../../icons/newWindow.svg';
import styles from './styles';

export class Screen extends Component {
	render = ({
		color,
		title,
		subtitle,
		notificationsEnabled = true,
		minimized = false,
		windowed = false,
		children,
		footer,
	}) => (
		<div className={createClassName(styles, 'screen')}>
			<Header color={color}>
				<Header.Content>
					<Header.Title>{title}</Header.Title>
					{subtitle && (
						<Header.SubTitle>{subtitle}</Header.SubTitle>
					)}
				</Header.Content>
				<Header.Actions>
					<Header.Action
						title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
						onClick={this.handleToggleNotifications}
					>
						{notificationsEnabled ?
							<NotificationsEnabledIcon width={20} /> :
							<NotificationsDisabledIcon width={20} />
						}
					</Header.Action>
					<Header.Action
						title={minimized ? 'Restore' : 'Minimize'}
						onClick={this.handleToggleMinimize}
					>
						{minimized ?
							<RestoreIcon width={20} /> :
							<MinimizeIcon width={20} />
						}
					</Header.Action>
					{!windowed && (
						<Header.Action title={'Open in a new window'} onClick={this.handleClickOpenWindow}>
							<OpenWindowIcon width={20} />
						</Header.Action>
					)}
				</Header.Actions>
			</Header>

			{!minimized && (
				<main className={createClassName(styles, 'screen__main')}>
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

export default Screen;
