const path = require('path');

module.exports = ({ config, mode }) => {
	delete config.resolve.alias['core-js'];

	config.resolve.alias = {
		...config.resolve.alias,
		'react': `${ __dirname }/compat.js`,
		'react-dom': `${ __dirname }/compat.js`,
	};

	const babelRule = config.module.rules.find((rule) => Array.isArray(rule.use) && rule.use.find(({ loader }) => loader === 'babel-loader'));
	babelRule.use.push({ loader: 'preact-i18nline/webpack-loader' });

	config.module.rules = config.module.rules.filter(({ loader }) => !/json-loader/.test(loader));

	const fileLoader = config.module.rules.find(({ loader }) => /file-loader/.test(loader));
	fileLoader.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i;

	config.module.rules.push({
		test: /\.(s?css|sass)$/,
		use: [
			{
				loader: 'style-loader',
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true,
					localIdentName: '[local]___[hash:base64:5]',
				},
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true,
				},
			},
		],
	});

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
