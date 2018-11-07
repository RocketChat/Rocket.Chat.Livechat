import webpack from 'webpack';
const webpackOverride = require('./webpackOverride.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
export default (config, env, helpers) => {
	// config.mode = 'production';
	// Use Preact CLI's helpers object to get the babel-loader
	const babel = helpers.getLoadersByName(config, 'babel-loader')[0].rule;
	// Update the loader config to include preact-i18nline
	// babel.options.presets[0][1].exclude.push('transform-async-to-generator');
	// // Add fast-async
	// babel.options.plugins.push([require.resolve('fast-async'), { spec: true }]);
	babel.loader = [
		{ // create an entry for the old loader
			loader: babel.loader,
			options: babel.options,
		},
		{ // add the preact-i18nline webpack loader
			loader: 'preact-i18nline/webpack-loader',
		},
	];
	// remove the old loader options
	delete babel.options;

	config.plugins.push(
		new webpack.ProvidePlugin({
			I18n: ['autoI18n', 'default'],
		})
	);

	config.plugins.push(new BundleAnalyzerPlugin());
	config.plugins[1].definitions['process.env'] = {};
	config.plugins[1].definitions.process = {};
	config.plugins[1].definitions['process.title'] = 'browser';
	config.mode = 'production';
	config.optimization = {
		removeAvailableModules: true,
		removeEmptyChunks: true,
		mergeDuplicateChunks: false,
		occurrenceOrder: false,
		concatenateModules: true,
		mangleWasmImports: true,
		sideEffects: false,
		portableRecords: true,
		minimizer: [
			new UglifyJsPlugin({ /* your config */ }),
		],
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				mqtt: {
					name: 'mqtt',
					chunks: 'all',
					test: /mqtt/,
					priority: 35,
				},
				ddp: {
					name: 'ddp',
					chunks: 'all',
					test: /Users\/guilhermegazzo\/Rocket.Chat.js.SDK\/dist\/lib\/drivers\/ddp.js/,
					priority: 55,
				},
				sdk: {
					name: 'Rocket.Chat.js.SDK',
					chunks: 'all',
					test: /Rocket.Chat.js.SDK/,
					priority: 30,
				},
				styles: {
					name: 'styles',
					test: /\.scss$/,
					chunks: 'all',
					priority: 50,
				},
				vendor: {
					// name of the chunk
					name: 'vendor',
					// async + async chunks
					chunks: 'all',
					// import file path containing node_modules
					test: /node_modules/,
					// priority
					priority: 20,
				},
				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'async',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true,
				},
			},
		},
	};
	return webpackOverride(config);
};
