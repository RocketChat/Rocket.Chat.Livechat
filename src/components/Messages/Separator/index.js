import format from 'date-fns/format';
import { createClassName, memo } from '../../helpers';
import styles from './styles';


export const Separator = memo(({
	date,
	unread,
	use: Element = 'div',
	className,
	style = {},
}) => (
	<Element
		className={createClassName(styles, 'separator', {
			date: !!date && !unread,
			unread: !date && !!unread,
		}, [className])}
		style={style}
	>
		<hr className={createClassName(styles, 'separator__line')} />
		{(date || unread) && (
			<span className={createClassName(styles, 'separator__text')}>
				{
					(!!date && format(date, 'MMM DD, YYYY').toUpperCase()) ||
					(unread && I18n.t('unread messages'))
				}
			</span>
		)}
		<hr className={createClassName(styles, 'separator__line')} />
	</Element>
));
