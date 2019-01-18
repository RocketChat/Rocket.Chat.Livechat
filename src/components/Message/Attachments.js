import { createClassName } from '../helpers';
import styles from './styles';
import DocIcon from '../../icons/doc.svg';
import FileIcon from '../../icons/file.svg';
import PDFIcon from '../../icons/pdf.svg';
import PPTIcon from '../../icons/ppt.svg';
import SheetIcon from '../../icons/sheet.svg';
import ZipIcon from '../../icons/zip.svg';
import DownloadIcon from '../../icons/download.svg';

const AttachmentIcon = ({ url }) => {
	let Icon = FileIcon;
	if (url) {
		const extension = url.split('.').pop();
		if (extension) {
			switch (true) {
				case /pdf/i.test(extension):
					Icon = PDFIcon;
					break;
				case /doc|docx|rtf|txt|odt|pages|log/i.test(extension):
					Icon = DocIcon;
					break;
				case /ppt|pptx|pps/i.test(extension):
					Icon = PPTIcon;
					break;
				case /xls|xlsx|csv/i.test(extension):
					Icon = SheetIcon;
					break;
				case /zip|rar|7z|gz/i.test(extension):
					Icon = ZipIcon;
					break;
				default:
					break;
			}
		}
	}
	return <Icon width={32} />;
};

const Attachment = ({ attachment }) => {
	if (attachment.audio_url) {
		return (
			<audio src={attachment.attachment_url} className={createClassName(styles, 'attachment')} controls>
				{I18n.t('You browser doesn\'t support audio element')}
			</audio>
		);
	}
	if (attachment.video_url) {
		return (
			<video
				src={attachment.attachment_url}
				className={[
					createClassName(styles, 'attachment'),
					createClassName(styles, 'attachment__video'),
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
					createClassName(styles, 'attachment'),
					createClassName(styles, 'attachment__image'),
				].join(' ')}
				src={attachment.attachment_url}
			/>
		);
	}
	return (
		<a
			className={[
				createClassName(styles, 'attachment'),
				createClassName(styles, 'attachment__no-preview'),
			].join(' ')}
			href={attachment.attachment_url}
			download
		>
			<AttachmentIcon url={attachment.attachment_url} />
			<span className={createClassName(styles, 'attachment__no-preview__title')}>{attachment.title}</span>
			<DownloadIcon width={20} className={createClassName(styles, 'attachment__no-preview__download')} />
		</a>
	);
};

const Attachments = ({ attachments }) => (
	<div>
		{attachments.map((attachment) => <Attachment attachment={attachment} />)}
	</div>
);
export default Attachments;
