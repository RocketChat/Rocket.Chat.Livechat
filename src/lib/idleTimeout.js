import { store } from '../store';

const idleTimeoutWarningId = 'idleTimeoutWarning';

export const handleIdleTimeout = async (idleTimeoutConfig) => {
	if (!idleTimeoutConfig) {
		return;
	}

	const {
		idleTimeoutAction,
		idleTimeoutMessage,
		idleTimeoutWarningTime,
		idleTimeoutTimeoutTime,
	} = idleTimeoutConfig;

	let warningTimer;
	let timeoutTimer;
	const { idleTimeout } = store.state;

	const onTimeout = async () => {
		console.log('IDLE TIMEOUT');
		// Show timeout alert
		// Update state
		// Send close chat to salesforce (In ChatEnd API reason: "clientIdleTimeout")
	};

	const onTimeoutWarning = async () => {
		console.log('IDLE TIMEOUT WARNING');

		// TODO: Send event to salesforce to call ChasitorIdleTimeoutWarningEvent API (idleTimeoutWarningEvent: "triggered")

		if (idleTimeout && idleTimeout.idleTimeoutTimer) {
			clearTimeout(idleTimeout.idleTimeoutTimer);
		}
		timeoutTimer = setTimeout(onTimeout, (idleTimeoutTimeoutTime - idleTimeoutWarningTime) * 1000);

		const { alerts } = store.state;
		const timeoutAlert = {
			id: idleTimeoutWarningId,
			children: idleTimeoutMessage || 'Are you still there? Please send a message within %s or this chat will time out.',
			error: true,
			hideCloseButton: true,
			timeout: 0,
		};
		await store.setState({ alerts: (alerts.push(timeoutAlert), alerts) });
	};

	if (idleTimeoutAction === 'start') {
		if (idleTimeout && idleTimeout.idleWarningTimer) {
			clearTimeout(idleTimeout.idleWarningTimer);
		}
		warningTimer = setTimeout(onTimeoutWarning, idleTimeoutWarningTime * 1000);
	} else if (idleTimeout && idleTimeout.idleWarningTimer) {
		clearTimeout(idleTimeout.idleWarningTimer);
		const { alerts } = store.state;
		await store.setState({ alerts: alerts.filter((alert) => alert.id !== idleTimeoutWarningId) });
	}

	await store.setState({
		idleTimeout: {
			idleWarningTimer: warningTimer,
			idleTimeoutTimer: timeoutTimer,
			idleTimeoutMessage,
			idleTimeoutWarningTime,
			idleTimeoutTimeoutTime,
			idleTimeoutRunning: idleTimeoutAction === 'start',
		},
	});
};
