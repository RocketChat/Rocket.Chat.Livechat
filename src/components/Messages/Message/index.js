import { formatDistance } from 'date-fns';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { h } from 'preact';

import I18n from '../../../i18n';
import { getAttachmentUrl, memo, normalizeTransferHistoryMessage, resolveDate } from '../../helpers';
import { AudioAttachment } from '../AudioAttachment';
import { FileAttachment } from '../FileAttachment';
import { ImageAttachment } from '../ImageAttachment';
import { MessageAvatars } from '../MessageAvatars';
import MessageBlocks from '../MessageBlocks';
import { MessageBubble } from '../MessageBubble';
import { MessageContainer } from '../MessageContainer';
import { MessageContent } from '../MessageContent';
import { MessageText } from '../MessageText';
import { MessageTime } from '../MessageTime';
import { VideoAttachment } from '../VideoAttachment';
import {
	MESSAGE_TYPE_ROOM_NAME_CHANGED,
	MESSAGE_TYPE_USER_ADDED,
	MESSAGE_TYPE_USER_REMOVED,
	MESSAGE_TYPE_USER_JOINED,
	MESSAGE_TYPE_USER_LEFT,
	MESSAGE_TYPE_WELCOME,
	MESSAGE_TYPE_LIVECHAT_CLOSED,
	MESSAGE_TYPE_LIVECHAT_STARTED,
	MESSAGE_TYPE_LIVECHAT_TRANSFER_HISTORY,
	MESSAGE_WEBRTC_CALL,
} from '../constants';

const renderContent = ({
	text,
	system,
	quoted,
	me,
	blocks,
	attachments,
	attachmentResolver,
	mid,
	rid,
}) => [
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
			})),
		),
	text && (
		<MessageBubble inverse={me} quoted={quoted} system={system}>
			<MessageText text={text} system={system} />
		</MessageBubble>
	),
	blocks && (
		<MessageBlocks
			blocks={blocks}
			mid={mid}
			rid={rid}
		/>
	),
].filter(Boolean);


const resolveWebRTCEndCallMessage = ({ webRtcCallEndTs, ts }) => {
	const callEndTime = resolveDate(webRtcCallEndTs);
	const callStartTime = resolveDate(ts);
	const callDuration = formatDistance(callEndTime, callStartTime);
	const time = format(callEndTime, isToday(callEndTime) ? 'HH:mm' : 'dddd HH:mm');
	return `${ I18n.t('Call ended at %{time}', { time }) } ${ I18n.t(' - Lasted %{callDuration}', { callDuration }) }`;
};

const getSystemMessageText = ({ t, conversationFinishedMessage, transferData, u, webRtcCallEndTs, ts }) =>
	(t === MESSAGE_TYPE_ROOM_NAME_CHANGED && I18n.t('Room name changed'))
	|| (t === MESSAGE_TYPE_USER_ADDED && I18n.t('User added by'))
	|| (t === MESSAGE_TYPE_USER_REMOVED && I18n.t('User removed by'))
	|| (t === MESSAGE_TYPE_USER_JOINED && I18n.t('User joined'))
	|| (t === MESSAGE_TYPE_USER_LEFT && I18n.t('User left'))
	|| (t === MESSAGE_TYPE_WELCOME && I18n.t('Welcome'))
	|| (t === MESSAGE_TYPE_LIVECHAT_CLOSED && (conversationFinishedMessage || I18n.t('Conversation finished')))
	|| (t === MESSAGE_TYPE_LIVECHAT_STARTED && I18n.t('Chat started'))
	|| (t === MESSAGE_TYPE_LIVECHAT_TRANSFER_HISTORY && normalizeTransferHistoryMessage(transferData, u))
	|| (t === MESSAGE_WEBRTC_CALL && webRtcCallEndTs && ts && resolveWebRTCEndCallMessage({ webRtcCallEndTs, ts }));

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
		system={!!message.t}
	>
		{!message.t && <MessageAvatars
			avatarResolver={avatarResolver}
			usernames={getMessageUsernames(compact, message)}
		/>}
		<MessageContent reverse={me}>
			{renderContent({
				text: message.t ? getSystemMessageText(message) : message.msg,
				system: !!message.t,
				me,
				attachments: message.attachments,
				blocks: message.blocks,
				mid: message._id,
				rid: message.rid,
				attachmentResolver,
			})}
		</MessageContent>
		{!compact && !message.t && <MessageTime normal={!me} inverse={me} ts={message.ts} />}
	</MessageContainer>
));
