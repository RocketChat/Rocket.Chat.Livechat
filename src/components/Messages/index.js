import isSameDay from 'date-fns/is_same_day';
import Message from '../Message';
import Separator from '../Separator';
import TypingIndicator from '../TypingIndicator';
import { createClassName, flatMap, getAttachmentsUrl } from '../helpers';
import styles from './styles';


export const Messages = ({
	user = {},
	agent = {},
	messages = [],
	typingAvatars = [],
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
					me={user._id && user._id === message.u._id}
					group={nextMessage && message.u._id === nextMessage.u._id}
					avatar={{
						src: (user._id === message.u._id && user.avatar && user.avatar.src) ||
							(agent._id === message.u._id && agent.avatar && agent.avatar.src),
						description: (user._id === message.u._id && user.avatar && user.avatar.description) ||
							(agent._id === message.u._id && agent.avatar && agent.avatar.description),
					}}
					attachmentsUrl={getAttachmentsUrl(message.attachments)}
					conversationFinishedMessage={conversationFinishedMessage}
					{...message}
				/>,
				showUnreadSeparator && <Separator key="unread" el="li" unread />,
			].filter(Boolean);
		}, [])}
		{typingAvatars && !!typingAvatars.length && <TypingIndicator el="li" avatars={typingAvatars} />}
	</ol>
);

export default Messages;
