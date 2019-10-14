/* eslint-disable quote-props */
const path = require('path');

const webpack = require('webpack');


const patchBabelLoader = (config) => {
	config.module.rules = config.module.rules.map((rule) => {
		if (rule.loader === 'babel-loader') {
			const { enforce, test, loader, options } = rule;

			return {
				enforce,
				test,
				use: [
					{ loader, options },
					{ loader: 'preact-i18nline/webpack-loader' },
				],
			};
		}

		if (Array.isArray(rule.use) && rule.use.find(({ loader }) => loader === 'babel-loader')) {
			return {
				...rule,
				use: [
					...rule.use,
					{ loader: 'preact-i18nline/webpack-loader' },
				],
			};
		}

		return rule;
	});
};

const patchFileLoader = (config) => {
	const fileLoader = config.module.rules.find(({ loader }) => /file-loader|url-loader/.test(loader));
	fileLoader.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i;
};

module.exports = (config/* , env */) => {
	config.resolve.extensions.push('.css');
	config.resolve.extensions.push('.scss');
	config.resolve.extensions.push('.svg');

	config.resolve.alias = Object.assign(
		config.resolve.alias,
		{
			'styles': path.join(__dirname, './src/styles'),
			'autoI18n': path.resolve(__dirname, './src/i18n'),
			'icons': path.join(__dirname, './src/icons'),
			'components': path.join(__dirname, './src/components'),
		}
	);

	patchBabelLoader(config);
	patchFileLoader(config);

	config.module.rules.push({
		test: /\.svg$/,
		use: [
			'desvg-loader/preact',
			'svg-loader',
			'image-webpack-loader',
		],
	});

	config.plugins.push(
		new webpack.ProvidePlugin({
			I18n: ['autoI18n', 'default'],
		})
	);

	return config;
};
