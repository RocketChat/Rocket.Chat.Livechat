export default (config, { isProd }) => {
	if (isProd) {
		config.output.publicPath = 'livechat/';
	}

	const babelRule = config.module.rules.find(({ loader }) => /babel-loader/.test(loader));
	babelRule.use = [
		{ loader: babelRule.loader, options: babelRule.options },
		{ loader: 'preact-i18nline/webpack-loader' },
	];
	delete babelRule.loader;
	delete babelRule.options;

	const filesRule = config.module.rules.find(({ loader }) => /file-loader|url-loader/.test(loader));
	filesRule.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i;

	config.module.rules.push({
		test: /\.svg$/,
		use: [
			'desvg-loader/preact',
			'svg-loader',
			'image-webpack-loader',
		],
	});

	config.performance = {
		hints: false,
	};

	config.optimization = {
		sideEffects: false,
		splitChunks: {
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 10,
			maxInitialRequests: 10,
			automaticNameDelimiter: '~',
			cacheGroups: {
				sdk: {
					name: 'sdk',
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

	return config;
};
