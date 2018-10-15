import { h } from 'preact';

import Leaveamessage from '../routes/leaveamessage';

const wrapped = ({ theme, offlineMessage, ...props }) => (
	<Leaveamessage
		{...props}
		color={theme.color}
		title={I18n.t('Need help?')}
		message={offlineMessage || I18n.t('We are not online right now. Please, leave a message.')}
		// onSubmit={console.log}
		// minimize={action('minimize')}
		// fullScreen={action('fullScreen')}
		// notification={action('notification')}
		emailPlaceholder={I18n.t('insert your e-mail here...')}
		namePlaceholder={I18n.t('insert your name here...')}
		messsagePlaceholder={I18n.t('write your message...')}
	/>
);
export default wrapped;
