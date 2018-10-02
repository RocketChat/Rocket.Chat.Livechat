import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

const TypingIndicator = ({ children }) => (
	<div aria-label={children} class={createClassName(styles, 'typing-indicator')}>
		<span class={createClassName(styles, 'typing-indicator__dot')} />
		<span class={createClassName(styles, 'typing-indicator__dot')} />
		<span class={createClassName(styles, 'typing-indicator__dot')} />
	</div>
);

export default TypingIndicator;
