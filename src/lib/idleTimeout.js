import { Livechat } from '../api';
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

	const clearTimers = (warning = true, timeout = true) => {
		if (warning && idleTimeout && idleTimeout.idleWarningTimer) {
			clearTimeout(idleTimeout.idleWarningTimer);
		}
		if (timeout && idleTimeout && idleTimeout.idleTimeoutTimer) {
			clearInterval(idleTimeout.idleTimeoutTimer);
		}
	};

	const getTimeString = (timeInseconds) => {
		const hours = Math.floor(timeInseconds / 3600);
		const minutes = Math.floor((timeInseconds - (hours * 3600)) / 60);
		const seconds = timeInseconds - (hours * 3600) - (minutes * 60);

		const timeString = `${ (hours && `${ hours.toString() }h `) || '' }${
			minutes.toString().padStart(2, '0') }m ${
			seconds.toString().padStart(2, '0') }s`;
		return timeString;
	};

	const showWarning = async (timeInseconds) => {
		let { alerts } = store.state;
		const timeoutTimeString = getTimeString(timeInseconds);
		const timeoutAlert = {
			id: idleTimeoutWarningId,
			children: idleTimeoutMessage.replace(/%t/g, timeoutTimeString) || `Are you still there? Please send a message within ${ timeoutTimeString } or this chat will time out.`,
			warning: true,
			hideCloseButton: true,
			timeout: 0,
			style: {
				height: 'auto',
			},
			contentStyle: {
				'white-space': 'normal',
			},
		};
		alerts = alerts.filter((alert) => alert.id !== idleTimeoutWarningId);
		await store.setState({ alerts: (alerts.push(timeoutAlert), alerts) });
	};

	const hideWarning = async () => {
		const { alerts } = store.state;
		await store.setState({ alerts: alerts.filter((alert) => alert.id !== idleTimeoutWarningId) });
	};

	const onTimeout = async () => {
		const { token, room: { _id: rid } = {} } = store.state;

		// Send customer idle timeout message to close chat
		if (token && rid) {
			await Promise.all([
				Livechat.sendMessage({ msg: 'customer_idle_timeout', token, rid }),
			]);
		}

		await store.setState({
			idleTimeout: {
				...store.state.idleTimeout,
				idleWarningTimer: null,
				idleTimeoutTimer: null,
				idleTimeoutRunning: false,
			},
		});
	};

	const onHandleTimeoutTimer = async () => {
		let countDown = idleTimeoutTimeoutTime - idleTimeoutWarningTime;
		timeoutTimer = setInterval(async () => {
			countDown -= 1;

			// Update warning
			showWarning(countDown);

			if (countDown === 0) {
				clearInterval(timeoutTimer);
				hideWarning();
				onTimeout();
			}
		}, 1000);
		await store.setState({
			idleTimeout: {
				...store.state.idleTimeout,
				idleTimeoutTimer: timeoutTimer,
			},
		});
	};

	const onTimeoutWarning = async () => {
		// TODO: Send event to salesforce to call ChasitorIdleTimeoutWarningEvent API (idleTimeoutWarningEvent: "triggered")

		clearTimers(false, true);
		showWarning(idleTimeoutTimeoutTime - idleTimeoutWarningTime);
		onHandleTimeoutTimer();
	};

	clearTimers();
	if (idleTimeoutAction === 'start') {
		warningTimer = setTimeout(onTimeoutWarning, idleTimeoutWarningTime * 1000);
	} else {
		hideWarning();
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
