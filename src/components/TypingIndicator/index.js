import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';
import Avatar from '../Avatar';

export const TypingAvatar = ({ avatars }) =>
	(<div className={createClassName(styles, 'avatar-container')}>{
		avatars.map((src) => <Avatar src={src} className={[styles.avatar]} />)
	}
	</div>);

const TypingIndicator = ({ children }) => (
	<div aria-label={children} class={createClassName(styles, 'typing-indicator')}>
		<span class={createClassName(styles, 'typing-indicator__dot')} />
		<span class={createClassName(styles, 'typing-indicator__dot')} />
		<span class={createClassName(styles, 'typing-indicator__dot')} />
	</div>
);

export default TypingIndicator;
