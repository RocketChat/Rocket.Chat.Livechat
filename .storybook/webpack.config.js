const { ProvidePlugin } = require('webpack');
const webpackOverride = require('../webpackOverride.config');


module.exports = ({ config, mode }) => {
	delete config.resolve.alias['core-js'];
	config = webpackOverride(config, mode);

	config.resolve.alias = Object.assign(
		config.resolve.alias,
		{
			'react': `${ __dirname }/compat.js`,
			'react-dom': `${ __dirname }/compat.js`,
		}
	);

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
			h: ['preact', 'h'],
			Component: ['preact', 'Component'],
			React: ['preact-compat'],
		})
	);

	return config;
};
