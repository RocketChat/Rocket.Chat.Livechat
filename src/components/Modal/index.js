import { h } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

const Modal = ({ open, children, overlay = true, animated, ...args }) => (
	(open && <div

		className={createClassName(styles, 'modal', { overlay })}
		{...args}
	         >
		<div className={createClassName(styles, 'container', { animated })} {...args}>{children}</div>
	</div>)
);

export default Modal;
