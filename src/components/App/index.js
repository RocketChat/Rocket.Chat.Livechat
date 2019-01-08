import { Component } from 'preact';
import { Router } from 'preact-router';
import Chat from '../../routes/Chat';
import LeaveMessage from '../../routes/LeaveMessage';
import ChatFinished from '../../routes/ChatFinished';
import SwitchDepartment from '../../routes/SwitchDepartment';
import GDPR from '../../routes/GDPR';
import Register from '../../routes/Register';
import { Provider as StoreProvider, Consumer as StoreConsumer } from '../../store';
import { loadConfig } from '../../lib/main';
import CustomFields from '../../lib/customFields';
import Triggers from '../../lib/triggers';

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

	async initialize() {
		await loadConfig();
		this.handleTriggers();
		CustomFields.init();
		this.setState({ initialized: true });
	}

	async finalize() {
		CustomFields.reset();
	}

	componentDidMount() {
		this.initialize();
	}

	componentWillUnmount() {
		this.finalize();
	}

	renderScreen() {
		const { user, config, triggered, gdpr } = this.props;
		const { accepted: gdprAccepted } = gdpr;
		const { settings: {
				registrationForm,
				nameFieldRegistrationForm,
				emailFieldRegistrationForm,
				forceAcceptDataProcessingConsent: gdprRequired
			},
			online,
		} = config;

		//Temporary implementation, the best approach for this resource is handling the the Router component
		if (gdprRequired && !gdprAccepted) {
			return <GDPR default path="/gdpr" />;
		}

		if (!online) {
			return <LeaveMessage default path="/LeaveMessage" />;
		}

		const showRegistrationForm = registrationForm && (nameFieldRegistrationForm || emailFieldRegistrationForm);
		if ((user && user.token) || !showRegistrationForm || triggered) {
			return <Chat default path="/home" />;
		}
		return <Register default path="/register" />;
	}

	render = () => (this.state.initialized &&
		<Router onChange={this.handleRoute}>
			{this.renderScreen()}
			<ChatFinished path="/chat-finished" />
			<SwitchDepartment path="/switch-department" />
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
				}) => (
					<App
						config={config}
						user={user}
						triggered={triggered}
						gdpr={gdpr}
					/>
				)}
			</StoreConsumer>
		</div>
	</StoreProvider>
);

export default AppConnector;
