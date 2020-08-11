module.exports = {
  addons: [
		'@storybook/addon-actions/register',
		'@storybook/addon-backgrounds/register',
		'@storybook/addon-knobs/register',
		'@storybook/addon-viewport/register',
  ],
  stories: [
		'../src/**/stories.js',
		'../src/**/story.js',
		'../src/**/*.stories.js',
		'../src/**/*.story.js',
  ],
};
