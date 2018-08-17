
const webpack  = require('webpack');
const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
	// we are extending the base alias config here, adding preact as an alias
	defaultConfig.resolve.alias = {
		...defaultConfig.resolve.alias,
		'react': 'preact-compat',
		'react-dom': 'preact-compat'
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
				loader: "style-loader"
			},
			{
				loader: "css-loader",
				options: {
					sourceMap: true,
					modules: true,
					localIdentName: "[local]___[hash:base64:5]"
				}
			}
		]
	})

	return defaultConfig;
};

// module.exports = {
// 	resolve: {
// 		extensions: ['.css','.js', 'jsx'],
// 		alias: {
// 			'react': 'preact-compat',
// 			'React': 'preact-compat',
// 			'react-dom': 'preact-compat'
// 		}
// 	},
// 	devtool: 'source-map',
// 	module: {
// 		rules: [
// 			{
// 				test: /\.css$/,
// 				use: [
// 					{
// 						loader: "style-loader"
// 					},
// 					{
// 						loader: "css-loader",
// 						options: {
// 							sourceMap: true,
// 							modules: true,
// 							localIdentName: "[local]___[hash:base64:5]"
// 						}
// 					}
// 				]
// 			}
// 			// { test: /\.css$/, loader: "style-loader!css-loader" }
// 		],
// 		loaders: [
// 			{
// 			test: /\.jsx?$/,
// 			loader: 'babel',
// 			exclude: /node_modules/,
// 		}],
// 	},
// };
