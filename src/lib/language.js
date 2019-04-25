import store from '../store';

/**
 * To normalize Language String and return language code
 * @param {String} languageString
 */
const normalizeLanguageString = (languageString) => {
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
};

/**
 * To get browser Language of user
 */
const browserLanguage = () => {
	navigator.userLanguage || navigator.language;
};

/**
 * This is configured langauge
 */
const configLanguage = () => {
	const { config: { settings: { language } = {} } = {}, iframe: { language: iframeLanguage } = {} } = store.state;
	return iframeLanguage || language;
};

/**
 * This will update langauge of widget
 */
export const setWidgetLanguage = () => {
	I18n.changeLocale(normalizeLanguageString(configLanguage() || browserLanguage()));
};

/**
 * To set language inside store
 * @param {String} language
 */
export const setLanguage = async(language) => {
	const { iframe } = store.state;
	await store.setState({ iframe: { ...iframe, language } });
	setWidgetLanguage();
};

