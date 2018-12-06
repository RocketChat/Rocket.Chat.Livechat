import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, color, text } from '@storybook/addon-knobs';
import Screen from '.';

const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px', background: 'white' }}>
		{storyFn()}
	</div>
));

storiesOf('Components|Livechat/Screen', module)
	.addDecorator(withKnobs)
	.addDecorator(screenCentered)
	.add('simple', () => (
		<Screen
			color={color('color', '#175CC4')}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
		>
			{text('content', 'Content')}
		</Screen>
	))
;
