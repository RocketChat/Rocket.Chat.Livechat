import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const AudioAttachment = memo(({
	url,
	className,
	style = {},
}) => (
	<audio
		src={url}
		controls
		className={createClassName(styles, 'audio-attachment', {}, [className])}
		style={style}
	>
		{I18n.t('You browser doesn\'t support audio element')}
	</audio>
));
