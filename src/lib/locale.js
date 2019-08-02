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
export const browserLanguage = () => navigator.userLanguage || navigator.language;

/**
 * This is configured langauge
 */
export const configLanguage = () => {
	const { config: { settings: { language } = {} } = {}, iframe: { language: iframeLanguage } = {} } = store.state;
	return iframeLanguage || language;
};

/**
 * This will update langauge of widget
 */
export const setWidgetLanguage = () => I18n.changeLocale(normalizeLanguageString(configLanguage() || browserLanguage()));

export const getDateFnsLocale = () => {
	const supportedLocales = ['ar', 'be', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'en', 'eo', 'es', 'fi', 'fil', 'fr', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ko', 'mk', 'nb', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'th', 'tr', 'zh_cn', 'zh_tw'];
	let fullLanguage = configLanguage() || browserLanguage();
	fullLanguage = fullLanguage.toLowerCase();
	const [languageCode] = fullLanguage.split ? fullLanguage.split(/[-_]/) : [];
	const locale = [fullLanguage, languageCode, 'en'].find((lng) => supportedLocales.indexOf(lng) > -1);
	// eslint-disable-next-line import/no-dynamic-require
	return require(`date-fns/locale/${ locale }/index.js`);
};
