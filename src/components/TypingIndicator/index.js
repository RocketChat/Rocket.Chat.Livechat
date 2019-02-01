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


const TypingAvatar = ({ avatars = [] }) => (
	<div className={createClassName(styles, 'typing__avatar-container')}>
		{avatars.map((avatar) => <Avatar src={avatar.src} description={avatar.description} className={createClassName(styles, 'typing__avatar')} />)}
	</div>
);


export const TypingIndicator = ({ avatars = [], children, el }) => (
	<Message.Body Element={el}>
		<Message.Container>
			<TypingAvatar avatars={avatars} />
			<Message.Content>
				<Message.Text>
					<TypingDots>{children}</TypingDots>
				</Message.Text>
			</Message.Content>
		</Message.Container>
	</Message.Body>
);


export default TypingIndicator;
