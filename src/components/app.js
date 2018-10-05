import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { api } from '@rocket.chat/sdk/dist/bundle.js';
// Code-splitting is automated for routes
import UserStore, { UserContext } from '../store/user';
import SettingStore, { SettingsContext } from '../store/settings';
import Home from '../containers/home';
import LeaveMessage from '../routes/leaveamessage';
import Register from '../containers/register';
window.api = api;
export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = (...args) => {
		this.currentUrl = args[0].url;
	};
	async componentDidMount() {
		// console.log(await api.livechat.config());
	}
	render() {
		return (
			<div id="app">
				<SettingStore>
					<UserStore>
						<UserContext.Consumer>
							{() => (
								<Router onChange={this.handleRoute}>
									<Register title="Register" path="/register/" />
									<Home path="/" />
									<LeaveMessage path="/leavemessage/" />
								</Router>
							)}
						</UserContext.Consumer>
					</UserStore>
				</SettingStore>
			</div>
		);
	}
}
