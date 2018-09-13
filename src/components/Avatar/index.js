import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';
import placeholder from './placeholder.png';

const Avatar = ({ small, large, src, description, ...args }) => (
	<div
		aria-label="User picture"
		className={createClassName(styles, 'avatar', { small, large })}
		{...args}
	>
		{src && <img alt={description} className={createClassName(styles, 'avatar-image')} src={src} />}
	</div>
);

export default Avatar;
