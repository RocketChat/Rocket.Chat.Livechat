import { getAttachmentUrl, memo } from '../../helpers';
import { MessageContainer } from '../MessageContainer';
import { MessageAvatars } from '../MessageAvatars';
import { MessageContent } from '../MessageContent';
import { MessageBubble } from '../MessageBubble';
import { MessageText } from '../MessageText';
import { MessageTime } from '../MessageTime';
import { AudioAttachment } from '../AudioAttachment';
import { VideoAttachment } from '../VideoAttachment';
import { ImageAttachment } from '../ImageAttachment';
import { FileAttachment } from '../FileAttachment';
import {
	MESSAGE_TYPE_ROOM_NAME_CHANGED,
	MESSAGE_TYPE_USER_ADDED,
	MESSAGE_TYPE_USER_REMOVED,
	MESSAGE_TYPE_USER_JOINED,
	MESSAGE_TYPE_USER_LEFT,
	MESSAGE_TYPE_WELCOME,
	MESSAGE_TYPE_LIVECHAT_CLOSED,
} from '../constants';


const renderAttachment = ({
	attachmentResolver = getAttachmentUrl,
	attachment,
}) => (
	(attachment.audio_url &&
		<AudioAttachment
			url={attachmentResolver(attachment.audio_url)}
		/>) ||
	(attachment.video_url &&
		<VideoAttachment
			url={attachmentResolver(attachment.video_url)}
		/>) ||
	(attachment.image_url &&
		<ImageAttachment
			url={attachmentResolver(attachment.image_url)}
		/>) ||
	(attachment.title_link &&
		<FileAttachment
			url={attachmentResolver(attachment.title_link)}
			title={attachment.title}
		/>)
);

const getSystemMessageText = ({ t, conversationFinishedMessage }) => (
	(t === MESSAGE_TYPE_ROOM_NAME_CHANGED && I18n.t('Room name changed')) ||
	(t === MESSAGE_TYPE_USER_ADDED && I18n.t('User added by')) ||
	(t === MESSAGE_TYPE_USER_REMOVED && I18n.t('User removed by')) ||
	(t === MESSAGE_TYPE_USER_JOINED && I18n.t('User joined')) ||
	(t === MESSAGE_TYPE_USER_LEFT && I18n.t('User left')) ||
	(t === MESSAGE_TYPE_WELCOME && I18n.t('Welcome')) ||
	(t === MESSAGE_TYPE_LIVECHAT_CLOSED && (conversationFinishedMessage || I18n.t('Conversation finished')))
);

export const Message = memo(({
	avatarResolver,
	attachmentResolver = getAttachmentUrl,
	use,
	ts,
	me,
	compact,
	className,
	style = {},
	...message
}) => (
	<MessageContainer
		id={message._id}
		compact={compact}
		reverse={me}
		use={use}
		className={className}
		style={style}
	>
		<MessageAvatars
			avatarResolver={avatarResolver}
			usernames={compact ? [] : (message.u && [message.u.username])}
		/>
		<MessageContent>
			{(message.attachments || [])
				.filter((attachment) => (attachment.audio_url || attachment.video_url || attachment.image_url || attachment.title_link))
				.map((attachment) => renderAttachment({ attachment, attachmentResolver }))}
			<MessageBubble inverse={me}>
				{(message.attachments || [])
					.filter((attachment) => attachment.message_link)
					.map((attachment) => <MessageText quote text={attachment.text} />)}
				<MessageText text={message.t ? getSystemMessageText(message) : message.msg} system={message.t} />
			</MessageBubble>
		</MessageContent>
		{!compact && <MessageTime ts={ts} />}
	</MessageContainer>
));
