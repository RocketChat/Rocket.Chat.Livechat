import { EventEmitter } from 'tiny-events';


const { localStorage } = global;

export default class Store extends EventEmitter {
	constructor(initialState = {}, { localStorageKey = 'store', dontPersist = [] } = {}) {
		super();
		this.localStorageKey = localStorageKey;
		this.dontPersist = dontPersist;

		let storedState;

		try {
			storedState = JSON.parse(localStorage.getItem(this.localStorageKey));
		} catch (e) {
			storedState = {};
		} finally {
			storedState = typeof storedState === 'object' ? storedState : {};
		}

		this._state = { ...initialState, ...storedState };

		window.addEventListener('storage', (e) => {
			// Cross-tab communication
			if (e.key !== this.localStorageKey) {
				return;
			}

			if (!e.newValue) {
				// The localStorage has been removed
				return location.reload();
			}

			const storedState = JSON.parse(e.newValue);
			this.setStoredState(storedState);
		});

		/*
		window.addEventListener('load', (e) => {
			const sessionId = e.timeStamp.toString(36).substring(4, 15);
			sessionStorage.setItem('sessionId', sessionId);
			const { sessionIds = [] } = this._state;
			this.setState({ sessionIds: [sessionId, ...sessionIds] });
		});

		window.addEventListener('beforeunload', () => {
			const sessionId = sessionStorage.getItem('sessionId');
			const { sessionIds = [] } = this._state;
			this.setState({ sessionIds: sessionIds.filter((session) => session !== sessionId) });
		});
		*/
	}

	get state() {
		return this._state;
	}

	persist() {
		const persistable = { ...this._state };
		for (const ignoredKey of this.dontPersist) {
			delete persistable[ignoredKey];
		}
		localStorage.setItem(this.localStorageKey, JSON.stringify(persistable));
	}

	setState(partialState) {
		const prevState = this._state;
		this._state = { ...prevState, ...partialState };
		this.persist();
		this.emit('change', this._state, prevState, partialState);
	}

	setStoredState(storedState) {
		const prevState = this._state;

		const nonPeristable = {};
		for (const ignoredKey of this.dontPersist) {
			nonPeristable[ignoredKey] = prevState[ignoredKey];
		}
		this._state = { ...storedState, ...nonPeristable };
		this.emit('change', this._state, prevState);
	}
}
