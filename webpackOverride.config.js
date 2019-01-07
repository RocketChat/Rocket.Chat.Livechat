/* eslint-disable quote-props */
const path = require('path');
const webpack = require('webpack');


const patchBabelLoader = (config) => {
	const babelLoader = config.module.rules.find(({ loader }) => /babel-loader/.test(loader));
	const { loader, test, enforce, include, exclude, options, query } = babelLoader;

	config.module.rules = [
		...config.module.rules.filter((loader) => loader !== babelLoader),
		{
			test,
			enforce,
			include,
			exclude,
			use: [
				{ loader, options: options || query },
				{ loader: 'preact-i18nline/webpack-loader' },
			],
		},
	];

	return config;
};

const patchFileLoader = (config) => {
	const fileLoader = config.module.rules.find(({ loader }) => /file-loader|url-loader/.test(loader));
	fileLoader.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i;

	return config;
};

module.exports = (config/* , env */) => {
	config.resolve.extensions.push('.css');
	config.resolve.extensions.push('.scss');
	config.resolve.extensions.push('.svg');

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

	config = patchBabelLoader(config);
	config = patchFileLoader(config);

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
