import { h } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';

const Composer = ({ pre, post, placeholder, ...args }) => (
	<div {...args} className={createClassName(styles, 'composer')}>
		{ pre }
		<div placeholder={placeholder} className={createClassName(styles, 'composer__input')} contenteditable />
		{ post }
	</div>
);

export default Composer;
