import { h } from 'preact';

import DownloadIcon from '../../../icons/download.svg';
import { createClassName, memo } from '../../helpers';
import { FileAttachmentIcon } from '../FileAttachmentIcon';
import { MessageBubble } from '../MessageBubble';
import I18n from '../../../i18n';
import styles from './styles.scss';


export const FileAttachment = memo(({
	url,
	title,
	className,
	iconsAccompanyingText,
	...messageBubbleProps
}) => (
	<MessageBubble
		className={createClassName(styles, 'file-attachment', {}, [className])}
		{...messageBubbleProps}
	>
		<a
			href={url}
			download
			target='_blank'
			rel='noopener noreferrer'
			className={createClassName(styles, 'file-attachment__inner')}
		>
			<FileAttachmentIcon url={url} />
			<span className={createClassName(styles, 'file-attachment__title')}> {title} </span>
				<span className={createClassName(styles, 'file-attachment-icon')}>
				<DownloadIcon width={20} height={20} />
				{iconsAccompanyingText ? <p className={createClassName(styles, 'file-attachment-icon__download-icon-title')}> {I18n.t('Download')} </p> : null} 
			</span>
		</a>
	</MessageBubble>
));
