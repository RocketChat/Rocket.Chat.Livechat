import format from 'date-fns/format';
import styles from './styles';
import { createClassName } from '../helpers';


const Separator = ({ date, unread }) => {
	if (!date && !unread) {
		return null;
	}

	return (
		<div class={createClassName(styles, 'separator', { date, unread })}>
			<hr class={createClassName(styles, 'separator__line')} />
			<span class={createClassName(styles, 'separator__text')}>
				{date ? format(date, 'MMM DD, YYYY').toUpperCase() : I18n.t('unread messages')}
			</span>
			<hr class={createClassName(styles, 'separator__line')} />
		</div>
	);
};

export default Separator;
