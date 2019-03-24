import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const VideoAttachment = memo(({
	url,
	className,
	style = {},
}) => (
	<video
		src={url}
		controls
		className={createClassName(styles, 'video-attachment', {}, [className])}
		style={style}
	>
		{I18n.t('You browser doesn\'t support video element')}
	</video>
));
