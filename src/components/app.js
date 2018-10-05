import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import UserStore, { UserContext } from '../store/user';
import Home from '../routes/home';
import LeaveMessage from '../routes/leaveamessage';
import Register from '../routes/register';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = (...args) => {
		console.log(args);
		this.currentUrl = args[0].url;
	};

	render() {
		return (
			<div id="app">
				<UserStore>
					<UserContext.Consumer>
						{({ state: { name } }) => (
							<Router onChange={this.handleRoute} TASSO={{ name }}>
								<Register title={name} path="/register/" />
								<Home path="/" />
								<LeaveMessage path="/leavemessage/" />
							</Router>
						)}
					</UserContext.Consumer>
				</UserStore>
			</div>
		);
	}
}
