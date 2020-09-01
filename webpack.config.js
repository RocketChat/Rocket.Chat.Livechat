module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules\/(?!(map-age-cleaner|)\/).*/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
