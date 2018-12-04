import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Store, { Consumer } from '../store';
import Home from '../containers/home';
import LeaveMessage from '../containers/leaveamessage';
import Register from '../containers/register';
import TriggersManager from '../lib/triggersManager';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleTriggers(config) {
		const { online, enabled } = config;

		if (!(online && enabled)) {
			return TriggersManager.setDisabled();
		}

		TriggersManager.setEnabled();
		TriggersManager.start();
	}

	handleRoute = (/* ...args*/) => {
		// this.currentUrl = args[0].url;
	};

	async componentDidMount() {
		// console.log(await api.livechat.config());
	}

	renderScreen({ user, config, messages, triggered }) {
		const { settings: { displayOfflineForm, registrationForm, nameFieldRegistrationForm, emailFieldRegistrationForm }, online /* , departments */ } = config;
		this.handleTriggers(config);

		if (!online) {
			if (displayOfflineForm) {
				return <LeaveMessage {...config} default path="/LeaveMessage" />;
			}
			return <LeaveMessage {...config} default path="/LeaveMessage" />;

		}

		const showRegistrationForm = registrationForm && (nameFieldRegistrationForm || emailFieldRegistrationForm);
		if ((user && user.token) || !showRegistrationForm || triggered) {
			return <Home {...config} messages={messages} default path="/home" />;
		}
		return <Register {...config} default path="/register" />;
	}
	render() {
		return (
			<Store>
				<div id="app">
					<Consumer>
						{(state) => (
							<Router onChange={this.handleRoute}>
								{this.renderScreen(state)}
							</Router>)}
					</Consumer>
				</div>
			</Store>
		);
	}
}
