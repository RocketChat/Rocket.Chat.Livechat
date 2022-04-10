import { h } from 'preact';

import '../../i18next';
import { Provider as StoreProvider, Consumer as StoreConsumer } from '../../store';
import App from './App';

const AppConnector = () => (
	<div id='app'>
		<StoreProvider>
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
					accessible,
					alerts,
					modal,
					dispatch,
					iframe,
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
						accessible={accessible}
						alerts={alerts}
						modal={modal}
						dispatch={dispatch}
						iframe={iframe}
					/>
				)}
			</StoreConsumer>
		</StoreProvider>
	</div>
);

export default AppConnector;
