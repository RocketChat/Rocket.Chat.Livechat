import { memo } from '../../helpers';
import { MessageContainer } from '../MessageContainer';
import { MessageContent } from '../MessageContent';
import { MessageBubble } from '../MessageBubble';
import { MessageAvatars } from '../MessageAvatars';
import { TypingDots } from '../TypingDots';


export const TypingIndicator = memo(({
	avatarResolver = () => null,
	usernames = [],
	text,
	...containerProps
}) => (
	<MessageContainer {...containerProps}>
		<MessageAvatars
			avatarResolver={avatarResolver}
			usernames={usernames}
		/>
		<MessageContent>
			<MessageBubble>
				<TypingDots text={text} />
			</MessageBubble>
		</MessageContent>
	</MessageContainer>
));
