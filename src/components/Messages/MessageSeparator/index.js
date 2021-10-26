import format from 'date-fns/format';
import { parseISO } from 'date-fns/fp';
import { h } from 'preact';
import { withTranslation } from 'react-i18next';

import { createClassName, memo } from '../../helpers';
import styles from './styles.scss';


const MessageSeparator = memo(({
	date,
	unread,
	use: Element = 'div',
	className,
	style = {},
	t,
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
					(!!date && format(parseISO(date), 'MMM dd, yyyy').toUpperCase())
					|| (unread && t('unread_messages'))
				}
			</span>
		)}
		<hr className={createClassName(styles, 'separator__line')} />
	</Element>
));

export default withTranslation()(MessageSeparator);
