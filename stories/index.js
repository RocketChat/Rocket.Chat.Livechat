import '../src/styles';
import initStoryshots, { imageSnapshot } from '@storybook/addon-storyshots';

initStoryshots({
	suite: 'Storyshots',
	test: imageSnapshot({
		storybookUrl: 'http://localhost:9001',
	}),
});
