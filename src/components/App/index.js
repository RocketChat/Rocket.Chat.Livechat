import { Component } from 'preact';
import { Router } from 'preact-router';
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


export class App extends Component {

	state = { initialized: false }

	handleRoute = () => {}

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

	handleDismissAlert = (id) => {
		const { dispatch, alerts = [] } = this.props;
		dispatch({ alerts: alerts.filter((alert) => alert.id !== id) });
	}

	getScreenProps = () => ({
		notificationsEnabled: this.props.sound && this.props.sound.enabled,
		minimized: false,
		windowed: false,
		sound: this.props.sound,
		alerts: this.props.alerts,
		modal: this.props.modal,
		onEnableNotifications: this.handleEnableNotifications,
		onDisableNotifications: this.handleDisableNotifications,
		onMinimize: this.handleMinimize,
		onRestore: this.handleRestore,
		onOpenWindow: this.handleOpenWindow,
		onDismissAlert: this.handleDismissAlert,
	})

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
	}

	componentWillUnmount() {
		this.finalize();
	}

	renderScreen = ({
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
	}) => {
		// Temporary implementation, the best approach for this resource is handling the the Router component
		if (gdprRequired && !gdprAccepted) {
			return <GDPRAgreement default path="/gdpr" {...this.getScreenProps()} />;
		}

		if (!online) {
			return <LeaveMessage default path="/LeaveMessage" {...this.getScreenProps()} />;
		}

		const showRegistrationForm = registrationForm && (nameFieldRegistrationForm || emailFieldRegistrationForm);
		if ((user && user.token) || !showRegistrationForm || triggered) {
			return <Chat default path="/home" {...this.getScreenProps()} />;
		}

		return <Register default path="/register" {...this.getScreenProps()} />;
	}

	render = (props, { initialized }) => initialized && (
		<Router onChange={this.handleRoute}>
			{this.renderScreen(props)}
			<ChatFinished path="/chat-finished" {...this.getScreenProps()} />
			<SwitchDepartment path="/switch-department" {...this.getScreenProps()} />
		</Router>
	)
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
