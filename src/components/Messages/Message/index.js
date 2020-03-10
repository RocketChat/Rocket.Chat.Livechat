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


const renderContent = ({ text, system, quoted, me, attachments, attachmentResolver }) => [
	...(attachments || [])
		.map((attachment) =>
			(attachment.audio_url
				&& <AudioAttachment
					quoted={quoted}
					url={attachmentResolver(attachment.audio_url)}
				/>)
			|| (attachment.video_url
				&& <VideoAttachment
					quoted={quoted}
					url={attachmentResolver(attachment.video_url)}
				/>)
			|| (attachment.image_url
				&& <ImageAttachment
					quoted={quoted}
					url={attachmentResolver(attachment.image_url)}
				/>)
			|| (attachment.title_link
				&& <FileAttachment
					quoted={quoted}
					url={attachmentResolver(attachment.title_link)}
					title={attachment.title}
				/>)
			|| ((attachment.message_link || attachment.tmid) && renderContent({
				text: attachment.text,
				quoted: true,
				attachments: attachment.attachments,
				attachmentResolver,
			}))
		),
	text && (
		<MessageBubble inverse={me} quoted={quoted}>
			<MessageText text={text} system={system} />
		</MessageBubble>
	),
].filter(Boolean);

const getSystemMessageText = ({ t, conversationFinishedMessage }) =>
	(t === MESSAGE_TYPE_ROOM_NAME_CHANGED && I18n.t('Room name changed'))
	|| (t === MESSAGE_TYPE_USER_ADDED && I18n.t('User added by'))
	|| (t === MESSAGE_TYPE_USER_REMOVED && I18n.t('User removed by'))
	|| (t === MESSAGE_TYPE_USER_JOINED && I18n.t('User joined'))
	|| (t === MESSAGE_TYPE_USER_LEFT && I18n.t('User left'))
	|| (t === MESSAGE_TYPE_WELCOME && I18n.t('Welcome'))
	|| (t === MESSAGE_TYPE_LIVECHAT_CLOSED && (conversationFinishedMessage || I18n.t('Conversation finished')));

const getMessageUsernames = (compact, message) => {
	if (compact || !message.u) {
		return [];
	}

	const { alias, u: { username, name } } = message;
	if (alias && name) {
		return [name];
	}

	return [username];
};

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
			usernames={getMessageUsernames(compact, message)}
		/>
		<MessageContent reverse={me}>
			{renderContent({
				text: message.t ? getSystemMessageText(message) : message.msg,
				system: !!message.t,
				me,
				attachments: message.attachments,
				attachmentResolver,
			})}
		</MessageContent>
		{!compact && <MessageTime ts={ts} />}
	</MessageContainer>
));
