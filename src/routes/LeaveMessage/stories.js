import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeaveMessage from './component';


const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px', height: '500px', background: 'white' }}>
		{storyFn()}
	</div>
));

storiesOf('Screen|Leave a message', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<LeaveMessage
			loading={boolean('loading', false)}
			title={I18n.t('Leave a message')}
			emailPlaceholder={I18n.t('insert your e-mail here...')}
			namePlaceholder={I18n.t('insert your name here...')}
			messsagePlaceholder={I18n.t('write your message...')}
			onSubmit={action('submit')}
			onToggleNotification={action('toggleNotification')}
			onToggleMinimize={action('toggleMinimize')}
			onToggleFullScreen={action('toggleFullScreen')}
		/>
	))
	.add('loading', () => (
		<LeaveMessage
			loading={boolean('loading', true)}
			title={I18n.t('Need help?')}
			emailPlaceholder={I18n.t('insert your e-mail here...')}
			namePlaceholder={I18n.t('insert your name here...')}
			messsagePlaceholder={I18n.t('write your message...')}
			onSubmit={action('submit')}
			onToggleNotification={action('toggleNotification')}
			onToggleMinimize={action('toggleMinimize')}
			onToggleFullScreen={action('toggleFullScreen')}
		/>
	))
;
