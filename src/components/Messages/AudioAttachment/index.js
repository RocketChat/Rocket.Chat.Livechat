import { h } from 'preact';

import I18n from '../../../i18n';
import { createClassName, memo } from '../../helpers';
import { MessageBubble } from '../MessageBubble';
import styles from './styles.scss';


export const AudioAttachment = memo(({
	url,
	className,
	...messageBubbleProps
}) => (
	<MessageBubble
		nude
		className={createClassName(styles, 'audio-attachment', {}, [className])}
		{...messageBubbleProps}
	>
		<audio
			src={url}
			controls
			className={createClassName(styles, 'audio-attachment__inner')}
		>
			{I18n.t('You browser doesn\'t support audio element')}
		</audio>
	</MessageBubble>
));
