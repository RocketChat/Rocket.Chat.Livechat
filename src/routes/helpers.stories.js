import centered from '@storybook/addon-centered';

export const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px', height: '500px' }}>
		{storyFn()}
	</div>
));
