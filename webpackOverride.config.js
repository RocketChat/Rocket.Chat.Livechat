const path = require('path');

module.exports = (config/* , env */) => {
	/* eslint-disable quote-props */
	config.resolve.alias = Object.assign(
		config.resolve.alias,
		{
			'react': 'preact-compat',
			'react-dom': 'preact-compat',
			'styles': path.join(__dirname, 'src/styles'),
			'icons': path.join(__dirname, 'src/icons'),
			'components': path.join(__dirname, 'src/components'),
			'autoI18n': path.resolve(__dirname, 'src/i18n'),
		}
	);

	return config;
};
