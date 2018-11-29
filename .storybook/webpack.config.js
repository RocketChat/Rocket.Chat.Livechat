
const webpack  = require('webpack');
const webpackOverride = require('../webpackOverride.config');
module.exports = (baseConfig, env, defaultConfig) => {
	// we are extending the base alias config here, adding preact as an alias
	defaultConfig = webpackOverride(defaultConfig, env);
	// defaultConfig.resolve.extensions.push('.sass');
	// adding new plugins to the default config.
	defaultConfig.plugins.push(
		new webpack.ProvidePlugin({
			Component: ['preact', 'Component'],
			React: ['preact-compat'],
			I18n: ['autoI18n', 'default']
		})
	);
	defaultConfig.module.rules.splice(2,1);
	defaultConfig.module.rules.push({
		test: /\.(s?css|sass)$/,
		use: [
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true,
					localIdentName: '[local]___[hash:base64:5]'
				}
			},
			{
				loader: 'sass-loader', options: {
					sourceMap: true
				}
			},
		]
	})

	const { include, exclude, test, ...loader } = defaultConfig.module.rules[0];

	defaultConfig.module.rules[0] = {
		test,
		include,
		exclude,
		use: [
			{ ...loader },
			{
				loader: 'preact-i18nline/webpack-loader'
			},
		]
	}

	// defaultConfig.module.rules[4].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;


	return defaultConfig;
};
