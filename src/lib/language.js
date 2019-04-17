import store from '../store';

class Language {
	constructor() {
		if (!Language.instance) {
			this._initiated = false;
			this._started = false;
			this._queue = {};
			Language.instance = this;
		}
    
		return Language.instance;
	}
  
	init() {
		if (this._initiated) {
			return;
		}

		this._initiated = true;
		store.on('change', this.handleStoreChange);
	}
  
	reset() {
		this._initiated = false;
		this._started = false;
		store.off('change', this.handleStoreChange);
	}

	handleStoreChange(state) {
		const { user } = state;
		if (user && user._id) {
			Language.instance._started = true;
		}
	}
  
	setLanguage(language) {
		const { iframe } = store.state;
		if (!this._started) {
			return;
		}

		store.setState({ iframe: { ...iframe, language } });
	}
  
	browserLanguage() {
		navigator.userLanguage || navigator.language;
	}
  
	normalizeLanguageString(languageString) {
		let [languageCode, countryCode] = languageString.split ? languageString.split(/[-_]/) : [];
		if (!languageCode || languageCode.length !== 2) {
			return 'en';
		}
		languageCode = languageCode.toLowerCase();

		if (!countryCode || countryCode.length !== 2) {
			countryCode = null;
		} else {
			countryCode = countryCode.toUpperCase();
		}

		return countryCode ? `${ languageCode }_${ countryCode }` : languageCode;
	}
}

const instance = new Language();
export default instance;
