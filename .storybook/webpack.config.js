const { ProvidePlugin } = require('webpack');
const webpackOverride = require('../webpackOverride.config');


module.exports = (baseConfig, env, config) => {

	config = webpackOverride(config, env);

	config.module.rules = config.module.rules.filter(({ loader }) => !/json-loader/.test(loader));

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

	config.plugins.push(
		new ProvidePlugin({
			Component: ['preact', 'Component'],
			React: ['preact-compat'],
		})
	);

	return config;
};
