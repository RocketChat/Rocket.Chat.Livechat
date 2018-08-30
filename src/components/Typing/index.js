import { h } from 'preact';
import style from './style';
const getStyles = (style, name, classes) => [style[name], ...Object.entries(style).filter(([key]) => classes[key]).map(([, value]) => value)].join(' ');

const Typing = ({ children }) => (<div aria-label={children} class={getStyles(style, 'loader', {})}><span class={getStyles(style, 'dot', {})} /><span class={getStyles(style, 'dot', {})} /><span class={getStyles(style, 'dot', {})} /></div>);

export default Typing;
