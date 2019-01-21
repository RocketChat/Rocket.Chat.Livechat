import isSameDay from 'date-fns/is_same_day';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';
import Separator from '../Separator';
import { createClassName, getAttachmentsUrl } from '../helpers';
import styles from './styles';


export const Messages = ({
	user = {},
	agent = {},
	messages = [],
	typingAvatars = [],
	conversationFinishedMessage,
}) => (
	<ol className={createClassName(styles, 'messages')}>
		{messages.map((message, index, arr) => {
			const nextMessage = arr[index + 1];

			let showDateSeparator = false;
			if (nextMessage && !isSameDay(message.ts, nextMessage.ts)) {
				showDateSeparator = true;
			}

			return (
				<div>
					<Message
						el="li"
						key={message._id}
						me={user._id && user._id === message.u._id}
						group={nextMessage && message.u._id === nextMessage.u._id}
						avatarUrl={(user._id === message.u._id && user.avatar && user.avatar.src) ||
							(agent._id === message.u._id && agent.avatar && agent.avatar.src)}
						attachmentsUrl={getAttachmentsUrl(message.attachments)}
						conversationFinishedMessage={conversationFinishedMessage}
						{...message}
					/>
					{showDateSeparator && <Separator date={nextMessage.ts} />}
				</div>
			);
		})}
		{typingAvatars && !!typingAvatars.length && <TypingIndicator avatars={typingAvatars} />}
	</ol>
);


export default Messages;
