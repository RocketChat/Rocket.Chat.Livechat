console.log('adsasd')
module.exports = {
	resolve: {
		extensions: ['.js', 'jsx'],
		alias: {
			'react': 'preact-compat',
			'React': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /node_modules/,
		}],
	},
};
