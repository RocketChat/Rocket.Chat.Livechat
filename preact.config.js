import webpack from 'webpack';
const webpackOverride = require('./webpackOverride.config');
const path = require('path');
export default (config, env, helpers) => {
	// config.mode = 'production';
	// Use Preact CLI's helpers object to get the babel-loader
	const babel = helpers.getLoadersByName(config, 'babel-loader')[0].rule;
	// Update the loader config to include preact-i18nline
	babel.options.presets[0][1].exclude.push('transform-async-to-generator');
	// Add fast-async
	babel.options.plugins.push([require.resolve('fast-async'), { spec: true }]);
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

	config.module.loaders[8].test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i;
	config.module.loaders.push({
		test: /\.svg$/,
		loader: 'desvg-loader/preact!svg-loader',
	});
	config.plugins.push(...[
		new webpack.ProvidePlugin({
			I18n: ['autoI18n', 'default'],
		}),
		new webpack.DefinePlugin({
			'process.env': {
			},
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	minChunks(module) {
		// 		return module.context && module.context.includes('node_modules');
		// 	},
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'components',
		// 	minChunks(module) {
		// 		return module.context && module.context.includes('components');
		// 	},
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	// (choose the chunks, or omit for all chunks)

		// 	// names: ["app", "subPageA"]
		// 	name: 'common',
		// 	minChunks: 2,
		// 	chunks: 'async',
		// 	priority: 10,
		// 	reuseExistingChunk: true,
		// 	enforce: true,
		// 	// children: true,
		// 	// (select all children of chosen chunks)

		// 	// minChunks: 3,
		// 	// (3 children must share the module before it's moved)
		// }),
	]);
	config = webpackOverride(config);
	config.resolve.alias = Object.assign({}, config.resolve.alias, {
		react: 'preact-compat',
		'react-dom': 'preact-compat',
		styles: path.join(__dirname, './src/styles'),
		icons: path.join(__dirname, './src/icons'),
		components: path.join(__dirname, './src/components'),
		autoI18n: path.resolve(__dirname, './src/i18n'),
	});
	// const { index } = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
	// config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
	// 	name: 'commons',
	// 	// (the commons chunk name)

	// 	filename: 'commons.js',
	// 	// (the filename of the commons chunk)

	// 	// minChunks: 3,
	// 	// (Modules must be shared between 3 entries)

	// 	// chunks: ["pageA", "pageB"],
	// 	// (Only use these entries)
	// }));
	return config;
};
