import store from '../store';

export const language = {

	setLanguage(language) {
		const { iframe } = store.state;
		store.setState({ iframe: { ...iframe, language } });
	},
  
	browserLanguage() {
		navigator.userLanguage || navigator.language;
	},
  
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
	},
};
