import { h } from 'preact';
import style from './style';
const getStyles = (style, name, classes) => [style[name], ...Object.entries(style).filter(([key]) => classes[key]).map(([, value]) => value)].join(' ');

const Composer = ({ pre, post, placeholder, ...args }) => (
	<div {...args} className={getStyles(style, 'composer', {})}>
		{ pre }
		<div placeholder={placeholder} className={getStyles(style, 'input', {})} contenteditable />
		{ post }
	</div>);

export default Composer;
