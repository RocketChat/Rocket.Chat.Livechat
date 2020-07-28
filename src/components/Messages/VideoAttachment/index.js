import { h } from 'preact';

import { createClassName, memo } from '../../helpers';
import { MessageBubble } from '../MessageBubble';
import styles from './styles.scss';
import I18n from '../../../i18n';


export const VideoAttachment = memo(({
	url,
	className,
	...messageBubbleProps
}) => (
	<MessageBubble
		nude
		className={createClassName(styles, 'video-attachment', {}, [className])}
		{...messageBubbleProps}
	>
		<video
			src={url}
			controls
			className={createClassName(styles, 'video-attachment__inner')}
		>
			{I18n.t('You browser doesn\'t support video element')}
		</video>
	</MessageBubble>
));
