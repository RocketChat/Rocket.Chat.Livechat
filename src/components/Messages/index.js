import isSameDay from 'date-fns/is_same_day';
import Message from '../Message';
import Separator from '../Separator';
import TypingIndicator from '../TypingIndicator';
import { createClassName, flatMap, getAttachmentsUrl, memo } from '../helpers';
import styles from './styles';


export const Messages = memo(({
	avatarResolver = () => null,
	uid,
	typingUsernames = [],
	messages = [],
	conversationFinishedMessage,
	lastReadMessageId,
}) => (
	<ol className={createClassName(styles, 'messages')}>
		{flatMap(messages, (message, i) => {
			const previousMessage = messages[i - 1];
			const nextMessage = messages[i + 1];
			const showDateSeparator = !previousMessage || !isSameDay(message.ts, previousMessage.ts);
			const showUnreadSeparator = lastReadMessageId && nextMessage && lastReadMessageId === message._id;

			return [
				showDateSeparator && <Separator key={message.ts} el="li" date={message.ts} />,
				<Message
					el="li"
					key={message._id}
					me={uid && message.u && uid === message.u._id}
					group={nextMessage && message.u && nextMessage.u && message.u._id === nextMessage.u._id}
					avatarResolver={avatarResolver}
					attachmentsUrl={getAttachmentsUrl(message.attachments)}
					conversationFinishedMessage={conversationFinishedMessage}
					{...message}
				/>,
				showUnreadSeparator && <Separator key="unread" el="li" unread />,
			].filter(Boolean);
		})}
		{typingUsernames && !!typingUsernames.length && (
			<TypingIndicator el="li" avatarResolver={avatarResolver} usernames={typingUsernames} />
		)}
	</ol>
));

export default Messages;
