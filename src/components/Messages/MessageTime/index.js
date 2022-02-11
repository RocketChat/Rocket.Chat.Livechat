import format from 'date-fns/format';
import { parseISO } from 'date-fns/fp';
import isToday from 'date-fns/isToday';
import { h } from 'preact';

import { getDateFnsLocale } from '../../../lib/locale';
import { createClassName, memo } from '../../helpers';
import styles from './styles.scss';


export const parseDate = (ts) => {
	const locale = getDateFnsLocale();
	const timestamp = new Date(ts).toISOString();
	return format(parseISO(timestamp), isToday(parseISO(timestamp)) ? 'HH:mm' : 'eeee HH:mm', { locale });
};

export const MessageTime = memo(({ ts, normal, inverted, className, style = {} }) => (
	<div className={createClassName(styles, 'message-time-wrapper')} aria-hidden='true'>
		<time
			dateTime={new Date(ts).toISOString()}
			className={createClassName(styles, 'message-time', { normal, inverted }, [className])}
			style={style}
		>
			{parseDate(ts)}
		</time>
	</div>
));
