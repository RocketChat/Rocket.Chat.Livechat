import { h } from 'preact';
import style from './style';

const getStyles = (style, name, classes) => [style[name], ...Object.entries(style).filter(([key]) => classes[key]).map(([, value]) => value)].join(' ');

const Input = ({ children, disabled, error, danger, stack, small, ...args }) => (
	<input {...args} disabled={disabled} className={getStyles(style, 'input', {
		disabled,
		error,
		danger,
		stack,
		small,
	})}
	>{children}</input>
);

export default Input;

export const Select = ({ children, disabled, error, danger, stack, small, ...args }) => (
	<input {...args} disabled={disabled} className={getStyles(style, 'input', {
		disabled,
		error,
		danger,
		stack,
		small,
	})}
	>{children}</input>
);

export const Form = ({ children, ...args }) => <form onSubmit={(e) => e.preventDefault()} {...args}> {children} </form>;

export const Label = ({ children, error }) => (<label className={getStyles(style, 'label', {
	error,
})}
                                               >{children}</label>);

export const Description = ({ children }) => <small className={style.description}>{children}</small>;

export const Error = ({ children }) => (<small
	className={getStyles(style, 'description', {
		error: true,
	})}
                                        >{children}</small>);

export const Item = ({ children, inline }) => (
	<div
		className={getStyles(style, 'formGroup', { inline })}
	>
		{children}
	</div>);
