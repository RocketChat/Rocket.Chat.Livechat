import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const ImageAttachment = memo(({
	url,
	className,
	style = {},
}) => (
	<img
		src={url}
		className={createClassName(styles, 'image-attachment', {}, [className])}
		style={style}
	/>
));
