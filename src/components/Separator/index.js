import format from 'date-fns/format';
import styles from './styles';
import { createClassName } from '../helpers';


const Separator = ({ date, unread, el = 'div' }) => {
	if (!date && !unread) {
		return null;
	}

	const Element = el;

	return (
		<Element className={createClassName(styles, 'separator', { date, unread })}>
			<hr className={createClassName(styles, 'separator__line')} />
			<span className={createClassName(styles, 'separator__text')}>
				{date ? format(date, 'MMM DD, YYYY').toUpperCase() : I18n.t('unread messages')}
			</span>
			<hr className={createClassName(styles, 'separator__line')} />
		</Element>
	);
};

export default Separator;
