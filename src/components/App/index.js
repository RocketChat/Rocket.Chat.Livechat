import { Component } from 'preact';
import { Router } from 'preact-router';
import Chat from '../../routes/Chat';
import LeaveMessage from '../../routes/LeaveMessage';
import Register from '../../routes/Register';
import { Provider as StoreProvider, Consumer as StoreConsumer } from '../../store';
import { loadConfig } from '../../lib/main';
import CustomFields from '../../lib/customFields';
import Triggers from '../../lib/triggers';
import Hooks from '../../lib/hooks';
import { parentCall } from '../../lib/parentCall';
import * as RocketChat from '../../lib/rocketchat.js';


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
		Hooks.init();
		this.setState({ initialized: true });
		parentCall('ready');
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
		const { user, config, triggered } = this.props;
		const { settings: { registrationForm, nameFieldRegistrationForm, emailFieldRegistrationForm }, online } = config;

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
				}) => (
					<App
						config={config}
						user={user}
						triggered={triggered}
					/>
				)}
			</StoreConsumer>
		</div>
	</StoreProvider>
);


export default AppConnector;
