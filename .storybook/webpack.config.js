const path = require('path');

module.exports = ({ config, mode }) => {
	config.resolve.alias = {
		...config.resolve.alias,
		'react': require.resolve('preact/compat'),
		'react-dom': require.resolve('preact/compat'),
	};

	const babelRule = config.module.rules.find((rule) => Array.isArray(rule.use) && rule.use.find(({ loader }) => loader === 'babel-loader'));
	babelRule.use.push({ loader: 'preact-i18nline/webpack-loader' });

	config.module.rules = config.module.rules.filter(({ loader }) => !/json-loader/.test(loader));

	const fileLoader = config.module.rules.find(({ loader }) => /file-loader/.test(loader));
	fileLoader.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf|mp[34])(\?.*)?$/;

	config.module.rules.push({
		test: /\.scss$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true,
					importLoaders: 1,
				},
			},
			'sass-loader',
		],
	});

	config.module.rules.push({
		test: /\.svg$/,
		exclude: [
			__dirname
		],
		use: [
			'desvg-loader/preact',
			'svg-loader',
		],
	});

	return config;
};
