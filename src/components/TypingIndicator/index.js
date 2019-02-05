import styles from './styles';
import { createClassName } from '../helpers';
import Avatar from '../Avatar';
import Message from '../Message';


export const TypingDots = ({ children }) => (
	<div aria-label={children} class={createClassName(styles, 'typing__dots')}>
		<span class={createClassName(styles, 'typing__dot')} />
		<span class={createClassName(styles, 'typing__dot')} />
		<span class={createClassName(styles, 'typing__dot')} />
	</div>
);


const TypingAvatar = ({ avatarResolver = () => null, usernames = [] }) => (
	<div className={createClassName(styles, 'typing__avatar-container')}>
		{usernames.map((username) => (
			<Avatar
				src={avatarResolver(username)}
				description={username}
				className={createClassName(styles, 'typing__avatar')}
			/>
		))}
	</div>
);


export const TypingIndicator = ({ avatarResolver = () => null, usernames = [], children, el }) => (
	<Message.Body Element={el}>
		<Message.Container>
			<TypingAvatar avatarResolver={avatarResolver} usernames={usernames} />
			<Message.Content>
				<Message.Text>
					<TypingDots>{children}</TypingDots>
				</Message.Text>
			</Message.Content>
		</Message.Container>
	</Message.Body>
);


export default TypingIndicator;
