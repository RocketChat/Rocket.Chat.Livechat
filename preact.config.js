import webpack from 'webpack';
const webpackOverride = require('./webpackOverride.config');
const path = require('path');
export default (config, env, helpers) => {
	// Use Preact CLI's helpers object to get the babel-loader
	const babel = helpers.getLoadersByName(config, 'babel-loader')[0].rule;
	// Update the loader config to include preact-i18nline
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
	config.plugins.push(
		new webpack.ProvidePlugin({
			I18n: ['autoI18n', 'default'],
		})
	);
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
	// config.plugins.splice(index, 1);
	return config;
};
