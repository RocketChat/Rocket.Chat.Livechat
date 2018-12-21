import styles from './styles';
import { createClassName } from '../helpers';


const Avatar = ({ small, large, src, description, className, ...args }) => (
	<div
		aria-label="User picture"
		className={createClassName(styles, 'avatar', { small, large, nobg: src }, [className])}
		{...args}
	>
		{src && <img alt={description} className={createClassName(styles, 'avatar__image')} src={src} />}
	</div>
);

export default Avatar;
