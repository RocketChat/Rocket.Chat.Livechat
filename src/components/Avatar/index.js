import { h } from 'preact';
import style from './style';
const getStyles = (style, name, classes) => [style[name], ...Object.entries(style).filter(([key]) => classes[key]).map(([, value]) => value)].join(' ');

const Avatar = ({ small, large, src, description, ...args }) => (
	<div aria-label="User picture" {...args} className={getStyles(style, 'wrapper', { small, large })}>
		{src && <img alt={description} className={getStyles(style, 'image', { small, large })} src={src} />}
	</div>);

export default Avatar;
