/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
<<<<<<< HEAD
export default function(config) {
=======
export default function(config, env, helpers) {
	console.log(config);
>>>>>>> composer
	config.resolve.alias.styles = './src/styles';
	return config;
}
