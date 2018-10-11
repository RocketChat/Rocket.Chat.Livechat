import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';
import Avatar from '../Avatar';
import * as Message from '../Message';


export const TypingAvatar = ({ users = [] }) => (<div className={createClassName(styles, 'avatar-container')}>{
	users.map((src) => <Avatar src={`http://localhost:3000/avatar/${ src }`} className={[styles.avatar]} />)
}
</div>);

export const TypingIndicator = ({ children }) => (
	<div aria-label={children} class={createClassName(styles, 'typing-indicator')}>
		<span class={createClassName(styles, 'typing-indicator__dot')} />
		<span class={createClassName(styles, 'typing-indicator__dot')} />
		<span class={createClassName(styles, 'typing-indicator__dot')} />
	</div>
);

const Typing = ({ users, description }) => (<Message.Body>
	<Message.Container>
		<TypingAvatar users={users} />
		<Message.Content><Message.Text><TypingIndicator>{description}</TypingIndicator></Message.Text></Message.Content>
	</Message.Container>
</Message.Body>);

export default Typing;
