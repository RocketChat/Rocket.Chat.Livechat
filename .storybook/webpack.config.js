
const webpack  = require('webpack');
const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
	// we are extending the base alias config here, adding preact as an alias
	defaultConfig.resolve.alias = {
		...defaultConfig.resolve.alias,
		'react': 'preact-compat',
		'react-dom': 'preact-compat',
		'styles': path.join(__dirname, '../src/styles')
	};

	defaultConfig.resolve.extensions.push('.css');
	defaultConfig.resolve.extensions.push('.scss');
	// defaultConfig.resolve.extensions.push('.sass');

	// adding new plugins to the default config.
	defaultConfig.plugins.push(
		new webpack.ProvidePlugin({
			Component: ['preact', 'Component'],
			React: ['preact-compat']
		})
	);

	defaultConfig.module.rules[2] = ({
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
				loader: "preact-i18nline/webpack-loader"
			},
		]
	}


	return defaultConfig;
};
