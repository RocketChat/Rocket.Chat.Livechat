import { Component } from 'preact';
import { Router, route } from 'preact-router';
import queryString from 'query-string';
import { Livechat } from '../../api';
import history from '../../history';
import { loadConfig, clearConnectionAlerts } from '../../lib/main';
import CustomFields from '../../lib/customFields';
import { setWidgetLanguage } from '../../lib/language';
import Triggers from '../../lib/triggers';
import Hooks from '../../lib/hooks';
import { parentCall } from '../../lib/parentCall';
import userPresence from '../../lib/userPresence';
import Chat from '../../routes/Chat';
import LeaveMessage from '../../routes/LeaveMessage';
import ChatFinished from '../../routes/ChatFinished';
import SwitchDepartment from '../../routes/SwitchDepartment';
import GDPRAgreement from '../../routes/GDPRAgreement';
import Register from '../../routes/Register';
import { Provider as StoreProvider, Consumer as StoreConsumer } from '../../store';
import { visibility } from '../helpers';
import constants from '../../lib/constants';
import { loadMessages } from '../../lib/room';

export class App extends Component {

	state = {
		initialized: false,
	}

	handleRoute = async() => {
		setTimeout(() => {
			const {
				config: {
					settings: {
						registrationForm,
						nameFieldRegistrationForm,
						emailFieldRegistrationForm,
						forceAcceptDataProcessingConsent: gdprRequired,
					},
					online,
					departments = [],
				},
				gdpr: {
					accepted: gdprAccepted,
				},
				triggered,
				user,
			} = this.props;

			if (gdprRequired && !gdprAccepted) {
				return route('/gdpr');
			}

			if (!online) {
				return route('/leave-message');
			}

			const showDepartment = departments.filter((dept) => dept.showOnRegistration).length > 0;

			const showRegistrationForm = (
				(registrationForm && (nameFieldRegistrationForm || emailFieldRegistrationForm || showDepartment)) &&
				!triggered &&
				!(user && user.token)
			);

			if (showRegistrationForm) {
				return route('/register');
			}
		}, 100);
	}

	handleTriggers() {
		const { config: { online, enabled } } = this.props;

		Triggers.enabled = online && enabled;

		if (online && enabled) {
			Triggers.init();
		}
	}

	handleEnableNotifications = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, enabled: true } });
	}

	handleDisableNotifications = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, enabled: false } });
	}

	handleMinimize = () => {
		parentCall('minimizeWindow');
		const { dispatch } = this.props;
		dispatch({ minimized: true });
	}

	handleRestore = () => {
		parentCall('restoreWindow');
		const { dispatch } = this.props;
		dispatch({ minimized: false, undocked: false });
	}

	handleOpenWindow = () => {
		parentCall('openPopout');
		const { dispatch } = this.props;
		dispatch({ undocked: true });
	}

	handleDismissAlert = (id) => {
		const { dispatch, alerts = [] } = this.props;
		dispatch({ alerts: alerts.filter((alert) => alert.id !== id) });
	}

	handleVisibilityChange = async() => {
		const { dispatch } = this.props;
		await dispatch({ visible: !visibility.hidden });
	}

	handleLanguageChange = () => {
		this.forceUpdate();
	}

	handleConnected = async() => {
		await clearConnectionAlerts();

		const { livechatConnectedAlertId } = constants;
		const { alerts, dispatch } = this.props;
		await dispatch({ alerts: (alerts.push({ id: livechatConnectedAlertId, children: I18n.t('Livechat connected.'), success: true }), alerts) });

		await loadConfig();
		await loadMessages();
	}

	handleDisconnected = async() => {
		await clearConnectionAlerts();

		const { livechatDisconnectedAlertId } = constants;
		const { alerts, dispatch } = this.props;
		await dispatch({ alerts: (alerts.push({ id: livechatDisconnectedAlertId, children: I18n.t('Livechat is not connected.'), error: true, timeout: 0 }), alerts) });
	}

	async initialize() {
		// TODO: split these behaviors into composable components
		// Call loadConfig before calling Livechat.connect
		await loadConfig();
		await Livechat.connect();
		this.handleTriggers();
		CustomFields.init();
		Hooks.init();
		userPresence.init();
		setWidgetLanguage();
    
		this.setState({ initialized: true });
		parentCall('ready');

		const { minimized } = this.props;
		parentCall(minimized ? 'minimizeWindow' : 'restoreWindow');

		visibility.addListener(this.handleVisibilityChange);
		this.handleVisibilityChange();
		window.addEventListener('beforeunload', () => {
			visibility.removeListener(this.handleVisibilityChange);
		});

		I18n.on('change', this.handleLanguageChange);

		Livechat.onStreamData('connected', this.handleConnected);
		Livechat.onStreamData('close', this.handleDisconnected);
	}

	async finalize() {
		CustomFields.reset();
		userPresence.reset();
		visibility.removeListener(this.handleVisibilityChange);
		I18n.off('change', this.handleLanguageChange);
	}

	componentDidMount() {
		this.initialize();
	}

	componentWillUnmount() {
		this.finalize();
	}

	render = ({
		sound,
		undocked,
		minimized,
		expanded,
		alerts,
		modal,
	}, { initialized }) => {
		if (!initialized) {
			return null;
		}

		const poppedOut = queryString.parse(window.location.search).mode === 'popout';

		const screenProps = {
			notificationsEnabled: sound && sound.enabled,
			minimized: !poppedOut && (minimized || undocked),
			expanded: !minimized && expanded,
			windowed: !minimized && poppedOut,
			sound,
			alerts,
			modal,
			onEnableNotifications: this.handleEnableNotifications,
			onDisableNotifications: this.handleDisableNotifications,
			onMinimize: this.handleMinimize,
			onRestore: this.handleRestore,
			onOpenWindow: this.handleOpenWindow,
			onDismissAlert: this.handleDismissAlert,
		};

		return (
			<Router history={history} onChange={this.handleRoute}>
				<Chat default path="/" {...screenProps} />
				<Register path="/register" {...screenProps} />
				<LeaveMessage path="/leave-message" {...screenProps} />
				<GDPRAgreement path="/gdpr" {...screenProps} />
				<ChatFinished path="/chat-finished" {...screenProps} />
				<SwitchDepartment path="/switch-department" {...screenProps} />
			</Router>
		);
	}
}

const AppConnector = () => (
	<StoreProvider>
		<div id="app">
			<StoreConsumer>
				{({
					config,
					user,
					triggered,
					gdpr,
					sound,
					undocked,
					minimized = true,
					expanded = false,
					alerts,
					modal,
					dispatch,
				}) => (
					<App
						config={config}
						gdpr={gdpr}
						triggered={triggered}
						user={user}
						sound={sound}
						undocked={undocked}
						minimized={minimized}
						expanded={expanded}
						alerts={alerts}
						modal={modal}
						dispatch={dispatch}
					/>
				)}
			</StoreConsumer>
		</div>
	</StoreProvider>
);

export default AppConnector;
