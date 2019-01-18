import SDK from '../api';
import store from '../store';

class CustomFields {
	constructor() {
		if (!CustomFields.instance) {
			this._initiated = false;
			this._queue = {};
			CustomFields.instance = this;
		}

		return CustomFields.instance;
	}

	init() {
		if (this._initiated) {
			return;
		}

		const { state } = store;
		const { token } = state;
		SDK.credentials.token = token;

		store.on('change', this.handleStoreChange);
	}

	reset() {
		this._initiated = false;
		this._queue = {};
		store.off('change', this.handleStoreChange);
	}

	handleStoreChange(state, prevState) {
		const { user } = state;
		const { user: prevUser } = prevState;
		if (!prevUser && user && user._id) {
			CustomFields.instance._initiated = true;
			CustomFields.instance.processCustomFields();
		}
	}

	processCustomFields() {
		Object.keys(this._queue).forEach((key) => {
			const { value, overwrite } = this._queue[key];
			this.setCustomField(key, value, overwrite);
		});

		this._queue = {};
	}

	setCustomField(key, value, overwrite = true) {
		if (!this._initiated) {
			this._queue[key] = { value, overwrite };
			return;
		}

		const { token } = SDK.credentials;
		SDK.sendCustomField({ token, key, value, overwrite });
	}
}

const instance = new CustomFields();
export default instance;
