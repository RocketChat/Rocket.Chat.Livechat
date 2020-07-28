import path from 'path';

import { ProvidePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default (config, env/* , helpers */) => {
	if (env.production) {
		config.output.publicPath = 'livechat/';
	}

	const babelRule = config.module.rules.find(({ loader }) => /babel-loader/.test(loader));
	babelRule.use = [
		{ loader: babelRule.loader, options: babelRule.options },
		{ loader: 'preact-i18nline/webpack-loader' },
	];
	delete babelRule.loader;
	delete babelRule.options;

	const filesRule = config.module.rules.find(({ loader }) => /file-loader/.test(loader));
	filesRule.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i;

	config.module.rules.push({
		test: /\.svg$/,
		use: [
			'desvg-loader/preact',
			'svg-loader',
			'image-webpack-loader',
		],
	});

	config.mode = 'production';

	config.performance = {
		hints: false,
	};

	config.optimization = {
		sideEffects: false,
		minimizer: [
			new UglifyJSPlugin({
				uglifyOptions: {
					extractComments: 'all',
					warnings: false,
					mangle: true,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_fnames: false,
					output: {
						comments: false,
					},
					compress: {
						unsafe_comps: true,
						properties: true,
						keep_fargs: false,
						pure_getters: true,
						collapse_vars: true,
						warnings: false,
						sequences: true,
						dead_code: true,
						drop_debugger: true,
						comparisons: true,
						conditionals: true,
						evaluate: true,
						booleans: true,
						loops: true,
						unused: true,
						if_return: true,
						join_vars: true,
						drop_console: true,
					},
				},
			}),
		],
		splitChunks: {
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 10,
			maxInitialRequests: 10,
			automaticNameDelimiter: '~',
			cacheGroups: {
				mqtt: {
					name: 'mqtt',
					chunks: 'async',
					test: /node_modules\/@rocket\.chat\/sdk\/drivers\/mqtt/,
					priority: 50,
				},
				ddp: {
					name: 'ddp',
					chunks: 'async',
					test: /ddp/,
					priority: 50,
				},
				sdk: {
					name: 'Rocket.Chat.js.SDK',
					chunks: 'all',
					test: /node_modules\/@rocket\.chat\/sdk/,
					priority: 40,
				},
				components: {
					name: 'components',
					test: /components|icons|\.scss$/,
					chunks: 'all',
					priority: 50,
				},
				vendor: {
					name: 'vendor',
					chunks: 'all',
					test: /node_modules/,
					priority: 30,
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

	const definePlugin = config.plugins.find((plugin) => plugin.constructor.name === 'DefinePlugin');
	definePlugin.definitions = {
		...definePlugin.definitions,
		process: {},
		'process.env': {},
		'process.title': 'browser',
	};

	config.plugins.push(new BundleAnalyzerPlugin({
		analyzerMode: 'disabled',
		generateStatsFile: true,
		statsFilename: 'stats.json',
	}));

	config.plugins.push(
		new ProvidePlugin({
			I18n: [path.resolve(__dirname, './src/i18n'), 'default'],
		}),
	);

	return config;
};
