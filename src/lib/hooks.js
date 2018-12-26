import Triggers from './triggers';
import CustomFields from './customFields';
import { store } from '../store';
import SDK from '../api';
import { parentCall } from './parentCall';
import { createToken } from '../components/helpers';
import { loadConfig } from '../lib/main';

const createOrUpdateGuest = async(guest) => {
	await SDK.grantVisitor({ visitor: { ...guest } });
	await loadConfig();
};

const updateIframeData = (data) => {
	const { iframe: { guest }, user: _id, token } = store.state;
	store.setState({ iframe: { ...iframe, guest: { ...guest, ...data } } });

	if (!_id) {
		return;
	}

	const guestData = { token, ...data };
	createOrUpdateGuest(guestData);
};

const api = {
	pageVisited(info) {
		if (info.change === 'url') {
			Triggers.processRequest(info);
		}

		const { token, room: { _id } } = store.state;
		//SDK.credentials.token = token;

		const { change, title, location: { href } } = info;
		SDK.sendVisitorNavigation({ token, rid: _id, page: { change, title, location: { href } } });
	},

	setCustomField(key, value, overwrite = true) {
		CustomFields.setCustomField(key, value, overwrite);
	},

	setTheme(newTheme = {}) {
		const { config: { theme } } = store.state;

		if (newTheme.color) {
			store.setState({ config: { theme: { ...theme, customColor: newTheme.color } } });
		}
		if (newTheme.fontColor) {
			store.setState({ config: { theme: { ...theme, customFontColor: newTheme.fontColor } } });
		}
	},

	setDepartment(department) {
		const { iframe, config: { departments } } = store.state;

		const deptExists = departments && !!departments.filter(dept => (dept._id === department));
		if (deptExists) {
			store.setState({ iframe: { ...iframe, department } });
		}
	},

	clearDepartment() {
		const { iframe } = store.state;
		store.setState({ iframe: { ...iframe, department: null } });
	},

	widgetOpened() {
		const { iframe } = store.state;
		store.setState({ iframe: { ...iframe, isWidgetOpened: true } });
	},

	widgetClosed() {
		const { iframe } = store.state;
		store.setState({ iframe: { ...iframe, isWidgetOpened: false } });
	},

	async setGuestToken(token) {
		const { token: localToken, iframe: { guest } } = store.state;
		if (token === localToken) {
			return;
		}

		store.setState({ token, iframe: { ...iframe, guest: { ...guest, token } } });
		await loadConfig();
	},

	setGuestName(name) {
		updateIframeData({ name });
	},

	setGuestEmail(email) {
		updateIframeData({ email });
	},

	registerGuest(data = {}) {
		if (typeof data !== 'object') {
			return;
		}

		if (!data.token) {
			data.token = createToken();
		}

		if (data.department) {
			Api.setDepartment(data.department);
		}

		createOrUpdateGuest(data);
	},
};

const onNewMessage = (msg) => {
	if (typeof msg.data === 'object' && msg.data.src !== undefined && msg.data.src === 'rocketchat') {
		if (api[msg.data.fn] !== undefined && typeof api[msg.data.fn] === 'function') {
			const args = [].concat(msg.data.args || []);
			api[msg.data.fn].apply(null, args);
		}
	}
};

class Hooks {
	constructor() {
		if (!Hooks.instance) {
			this._started = false;
			Hooks.instance = this;
		}

		return Hooks.instance;
	}

	init() {
		if (this._started) {
			return;
		}

		this._started = true;
		window.addEventListener('message', onNewMessage, false);
	}

	reset() {
		this._started = false;
		window.removeEventListener('message', onNewMessage, false);
	}
};

const instance = new Hooks();
export default instance;
