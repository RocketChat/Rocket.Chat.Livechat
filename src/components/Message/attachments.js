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

const Attachment = ({ attachment }) => {
	if (attachment.audio_url) {
		return (
			<audio src={attachment.attachment_url} className={createClassName(styles, 'message__attachment')} controls>
				{I18n.t('You browser doesn\'t support audio element')}
			</audio>
		);
	}

	if (attachment.video_url) {
		return (
			<video
				src={attachment.attachment_url}
				className={[
					createClassName(styles, 'message__attachment'),
					createClassName(styles, 'message__attachment--video'),
				].join(' ')}
				controls
			>
				{I18n.t('You browser doesn\'t support video element')}
			</video>
		);
	}

	if (attachment.image_url) {
		return (
			<img
				className={[
					createClassName(styles, 'message__attachment'),
					createClassName(styles, 'message__attachment--image'),
				].join(' ')}
				src={attachment.attachment_url}
			/>
		);
	}

	return (
		<a
			className={[
				createClassName(styles, 'message__attachment'),
				createClassName(styles, 'message__attachment--no-preview'),
			].join(' ')}
			href={attachment.attachment_url}
			download
			target="_blank"
			rel="noopener noreferrer"
		>
			<AttachmentIcon url={attachment.attachment_url} />
			<span className={createClassName(styles, 'message__attachment-title')}>{attachment.title}</span>
			<DownloadIcon width={20} className={createClassName(styles, 'message__attachment-download')} />
		</a>
	);
};

const Attachments = ({ attachments, className }) => (
	<div className={createClassName(styles, 'message__attachments', {}, [className])}>
		{attachments.map((attachment) => <Attachment attachment={attachment} />)}
	</div>
);


export default Attachments;
