import { h } from 'preact';
import style from './style';

const getStyles = (style, name, classes) => [style[name], ...Object.entries(style).filter(([key]) => classes[key]).map(([, value]) => value)].join(' ');

const Button = ({ children, disabled, outline, danger, stack, small, ...args }) => (
	<button {...args} disabled={disabled} className={getStyles(style, 'button', {
		disabled,
		outline,
		danger,
		stack,
		small,
	})}
	>{children}</button>
);

export default Button;

export const Group = ({ children }) => <div className={style.group}>{ children }</div>;
