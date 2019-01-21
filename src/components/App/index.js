import { Component } from 'preact';
import { Router, route } from 'preact-router';
import Chat from '../../routes/Chat';
import LeaveMessage from '../../routes/LeaveMessage';
import ChatFinished from '../../routes/ChatFinished';
import SwitchDepartment from '../../routes/SwitchDepartment';
import GDPRAgreement from '../../routes/GDPRAgreement';
import Register from '../../routes/Register';
import { Provider as StoreProvider, Consumer as StoreConsumer } from '../../store';
import { loadConfig } from '../../lib/main';
import CustomFields from '../../lib/customFields';
import Triggers from '../../lib/triggers';
import userPresence from '../../lib/userPresence';
import history from '../../history';

let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== 'undefined') {
	hidden = 'hidden';
	visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
	hidden = 'msHidden';
	visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
	hidden = 'webkitHidden';
	visibilityChange = 'webkitvisibilitychange';
}

export class App extends Component {

	state = { initialized: false }

	handleRoute = async() => {
		const {
			config: {
				settings: {
					registrationForm,
					nameFieldRegistrationForm,
					emailFieldRegistrationForm,
					forceAcceptDataProcessingConsent: gdprRequired,
				},
				online,
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

		const showRegistrationForm = (
			(registrationForm && (nameFieldRegistrationForm || emailFieldRegistrationForm)) &&
			!triggered &&
			!(user && user.token)
		);

		if (showRegistrationForm) {
			return route('/register');
		}
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
		const { dispatch } = this.props;
		dispatch({ minimized: true });
	}

	handleRestore = () => {
		const { dispatch } = this.props;
		dispatch({ minimized: false });
	}

	handleDismissAlert = (id) => {
		const { dispatch, alerts = [] } = this.props;
		dispatch({ alerts: alerts.filter((alert) => alert.id !== id) });
	}

	handleVisibilityChange = async() => {
		const { dispatch } = this.props;
		await dispatch({ visible: !document[hidden] });
	}

	async initialize() {
		await loadConfig();
		this.handleTriggers();
		CustomFields.init();
		userPresence.init();

		this.setState({ initialized: true });
	}

	async finalize() {
		CustomFields.reset();
		userPresence.reset();
	}

	componentDidMount() {
		this.initialize();
		document.addEventListener(visibilityChange, this.handleVisibilityChange);
	}

	componentWillUnmount() {
		this.finalize();
		document.removeEventListener(visibilityChange, this.handleVisibilityChange);
	}

	render = (props, { initialized }) => {
		if (!initialized) {
			return null;
		}

		const screenProps = {
			notificationsEnabled: this.props.sound && this.props.sound.enabled,
			minimized: this.props.minimized,
			windowed: this.props.windowed,
			sound: this.props.sound,
			alerts: this.props.alerts,
			modal: this.props.modal,
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
					minimized,
					windowed,
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
						minimized={minimized}
						windowed={windowed}
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
