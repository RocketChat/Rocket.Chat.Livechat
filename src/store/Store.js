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
}
