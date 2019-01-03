import styles from './styles';
import { createClassName } from '../helpers';


export const Modal = ({ children, animated, open, ...props }) => (
	open ?
		<div className={createClassName(styles, 'modal__overlay')}>
			<div className={createClassName(styles, 'modal', { animated })} {...props}>{children}</div>
		</div> :
		null
);

export default Modal;
