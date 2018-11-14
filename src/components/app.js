import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Store, { Consumer } from '../store';
import Home from '../containers/home';
import LeaveMessage from '../containers/leaveamessage';
import Register from '../containers/register';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = (/* ...args*/) => {
		// this.currentUrl = args[0].url;
	};
	async componentDidMount() {
		// console.log(await api.livechat.config());
	}

	renderScreen({ user, config, messages }) {
		const { settings = {}, online } = config;

		if (online) {
			if (user && user.token) {
				return <Home {...config} messages={messages} default path="/home" />;
			}
			return <Register {...config} default path="/register" />;
		}
		if (settings.displayOfflineForm) {
			return <LeaveMessage {...config} default path="/LeaveMessage" />;
		}
		return <LeaveMessage {...config} default path="/LeaveMessage" />;

	}
	render() {
		return (
			<Store>
				<div id="app">
					<Consumer>
						{
							(state) => {
								this.actions = state.dispatch;
								return (
									< Router onChange={this.handleRoute} >
										{this.renderScreen(state)}
									</Router>
								)
							}
						}
					</Consumer>
				</div>
			</Store>
		);
	}
}
