import { createClassName, memo } from '../../helpers';
import { FileAttachmentIcon } from '../FileAttachmentIcon';
import { MessageBubble } from '../MessageBubble';
import styles from './styles';
import DownloadIcon from '../../../icons/download.svg';


export const FileAttachment = memo(({
	url,
	title,
	className,
	style = {},
}) => (
	<MessageBubble
		className={createClassName(styles, 'file-attachment', {}, [className])}
		style={style}
	>
		<a
			href={url}
			download
			target="_blank"
			rel="noopener noreferrer"
			className={createClassName(styles, 'file-attachment__inner', {}, [className])}
			style={style}
		>
			<FileAttachmentIcon url={url} />
			<span className={createClassName(styles, 'file-attachment__title')}>{title}</span>
			<DownloadIcon width={20} className={createClassName(styles, 'file-attachment__download-button')} />
		</a>
	</MessageBubble>
));
