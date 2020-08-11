import { h } from 'preact';

import { createClassName, memo } from '../helpers';
import styles from './styles.scss';


const handleMouseUp = ({ target }) => target.blur();

export const Button = memo(({
	submit,
	disabled,
	outline,
	nude,
	danger,
	secondary,
	stack,
	small,
	loading,
	badge,
	icon,
	onClick,
	className,
	style = {},
	children,
}) => (
	<button
		type={submit ? 'submit' : 'button'}
		disabled={disabled}
		onClick={onClick}
		onMouseUp={handleMouseUp}
		aria-label={icon ? children[0] : null}
		className={createClassName(styles, 'button', {
			disabled,
			outline,
			nude,
			danger,
			secondary,
			stack,
			small,
			loading,
			icon: !!icon,
		}, [className])}
		style={style}
	>
		{badge ? (<span className={createClassName(styles, 'button__badge')}>{badge}</span>) : null}
		{icon || children}
	</button>
));
