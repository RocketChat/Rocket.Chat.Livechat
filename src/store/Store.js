import { EventEmitter } from 'tiny-events';


const { localStorage } = global;

const identityReducer = (newState) => newState;

export default class Store extends EventEmitter {
	constructor(initialState = {}, localStorageKey = 'store') {
		super();
		this.localStorageKey = localStorageKey;

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

	morph = async(newState, reducer = identityReducer) => {
		this._state = await reducer({ ...this._state, ...newState }, this._state);
		localStorage.setItem(this.localStorageKey, JSON.stringify({ ...this._state, typing: [] })); // why typing is not stored?
	}
}
