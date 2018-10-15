const path = require('path');

module.exports = (config/* , env */) => {
	config.resolve.extensions.push('.css');
	config.resolve.extensions.push('.scss');
	config.resolve.extensions.push('.svg');
	/* eslint-disable quote-props */
	config.resolve.alias = Object.assign(
		config.resolve.alias,
		{
			'React': 'preact-compat',
			'react': 'preact-compat',
			'react-dom': 'preact-compat',
			'styles': path.join(__dirname, './src/styles'),
			'autoI18n': path.resolve(__dirname, './src/i18n'),
			'icons': path.join(__dirname, './src/icons'),
			'components': path.join(__dirname, './src/components'),
		}
	);

	const loader = config.module.rules.find(({ loader }) => /file-loader|url-loader/.test(loader));
	loader.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i;
	config.module.rules.push({
		test: /\.svg$/,
		use: [
			'desvg-loader/preact',
			'svg-loader',
			'image-webpack-loader',
		],
	});

	return config;
};
