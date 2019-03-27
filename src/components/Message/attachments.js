import { h } from 'preact';
import { createClassName } from '../helpers';
import DocIcon from '../../icons/doc.svg';
import FileIcon from '../../icons/file.svg';
import PDFIcon from '../../icons/pdf.svg';
import PPTIcon from '../../icons/ppt.svg';
import SheetIcon from '../../icons/sheet.svg';
import ZipIcon from '../../icons/zip.svg';
import DownloadIcon from '../../icons/download.svg';
import styles from './styles';
import { parseMessage } from './parsers';

export const AttachmentContent = ({ children, replied, resource }) => (
	<div className={createClassName(styles, 'message__attachment', { resource })}>
		{replied && <div className={createClassName(styles, 'message__attachment-block-border')} />}
		{children}
	</div>
);

const AttachmentIcon = ({ url }) => {
	let icon;

	const extension = url ? url.split('.').pop() : null;
	if (extension) {
		switch (true) {
			case /pdf/i.test(extension):
				icon = PDFIcon;
				break;
			case /doc|docx|rtf|txt|odt|pages|log/i.test(extension):
				icon = DocIcon;
				break;
			case /ppt|pptx|pps/i.test(extension):
				icon = PPTIcon;
				break;
			case /xls|xlsx|csv/i.test(extension):
				icon = SheetIcon;
				break;
			case /zip|rar|7z|gz/i.test(extension):
				icon = ZipIcon;
				break;
		}
	}

	return h(icon || FileIcon, { width: 32 });
};

const Attachment = ({ attachment, replied }) => {
	const {
		audio_url: audioUrl,
		video_url: videoUrl,
		image_url: imageUrl,
		attachment_url: attachmentUrl,
		text,
		attachments,
		title,
		message_link: messageLink,
	} = attachment;

	replied = replied || messageLink !== undefined;
	const resource = replied && (audioUrl || videoUrl || imageUrl);

	if (audioUrl) {
		return (
			<AttachmentContent replied={replied} resource={resource}>
				<audio src={attachmentUrl} className={createClassName(styles, 'message__attachment')} controls>
					{I18n.t('You browser doesn\'t support audio element')}
				</audio>
			</AttachmentContent>
		);
	}

	if (videoUrl) {
		return (
			<AttachmentContent replied={replied} resource={resource}>
				<video
					src={attachmentUrl}
					className={createClassName(styles, 'message__attachment--video')}
					controls
				>
					{I18n.t('You browser doesn\'t support video element')}
				</video>
			</AttachmentContent>
		);
	}

	if (imageUrl) {
		return (
			<AttachmentContent replied={replied} resource={resource}>
				<img
					className={createClassName(styles, 'message__attachment--image')}
					src={attachmentUrl}
				/>
			</AttachmentContent>
		);
	}

	if (text) {
		const message = { msg: text };
		return (
			<AttachmentContent replied={replied} resource={resource}>
				<div
					className={createClassName(styles, 'message__text')}
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: parseMessage(message) }}
				/>
			</AttachmentContent>
		);
	}

	if (attachments && attachments.length) {
		return (<Attachments attachments={attachments} replied={replied} />);
	}

	return (
		<AttachmentContent replied={replied} resource={resource}>
			<a
				className={createClassName(styles, 'message__attachment--no-preview')}
				href={attachmentUrl}
				download
				target="_blank"
				rel="noopener noreferrer"
			>
				<AttachmentIcon url={attachmentUrl} />
				<span className={createClassName(styles, 'message__attachment-title')}>{title}</span>
				<DownloadIcon width={20} className={createClassName(styles, 'message__attachment-download')} />
			</a>
		</AttachmentContent>
	);
};

const Attachments = ({ attachments, replied, className }) => (
	<div className={createClassName(styles, 'message__attachments', {}, [className])}>
		{attachments.map((attachment) => <Attachment attachment={attachment} replied={replied} />)}
	</div>
);


export default Attachments;
