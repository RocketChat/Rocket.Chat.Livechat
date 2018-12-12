import Message from '../Message';
import TypingIndicator from '../TypingIndicator';
import { createClassName, getAttachmentsUrl } from '../helpers';
import styles from './styles';


export const Messages = ({
	user: { _id: userId, avatar: userAvatar = {} } = {},
	agent: { _id: agentId, avatar: agentAvatar = {} } = {},
	messages = [],
	typingAvatars = [],
}) => (
	<ol className={createClassName(styles, 'messages')}>
		{messages.map((message, index, arr) => {
			const { _id: messageId, u: { _id: messageUserId } = {}, attachments } = message;
			const { u: { _id: nextMessageUserId } = {} } = arr[index + 1] || {};

			return (
				<Message
					el="li"
					key={messageId}
					me={userId === messageUserId}
					group={messageUserId === nextMessageUserId}
					avatarUrl={(userId === messageUserId && userAvatar.src) ||
						(agentId === messageUserId && agentAvatar.src)}
					attachmentsUrl={getAttachmentsUrl(attachments)}
					{...message}
				/>
			);
		})}
		{typingAvatars && !!typingAvatars.length && <TypingIndicator avatars={typingAvatars} />}
	</ol>
);


export default Messages;
