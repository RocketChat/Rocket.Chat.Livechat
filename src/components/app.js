import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Chat from '../routes/Chat';
import LeaveMessage from '../routes/LeaveMessage';
import Register from '../routes/Register';
import { store, Provider as StoreProvider, Consumer as StoreConsumer } from '../store';
import CustomFields from '../lib/customFields';
import Triggers from '../lib/triggers';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = (/* ...args*/) => {
		// this.currentUrl = args[0].url;
	}

	handleTriggers() {
		const { state } = store;
		const { config: { online, enabled } } = state;

		if (!(online && enabled)) {
			return Triggers.enabled = false;
		}

		Triggers.enabled = true;
		Triggers.init();
	}

	componentDidMount() {
		this.handleTriggers();
		CustomFields.init();
	}

	componentWillUnmount() {
		CustomFields.reset();
	}

	renderScreen({ user, config, triggered }) {
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
	render() {
		return (
			<StoreProvider>
				<div id="app">
					<StoreConsumer>
						{(state) => (
							<Router onChange={this.handleRoute}>
								{this.renderScreen(state)}
							</Router>
						)}
					</StoreConsumer>
				</div>
			</StoreProvider>
		);
	}
}
