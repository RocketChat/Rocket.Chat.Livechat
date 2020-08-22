import format from 'date-fns/format';
import { parseISO } from 'date-fns/fp';
import isToday from 'date-fns/isToday';
import { h } from 'preact';

import { createClassName, memo } from '../../helpers';
import styles from './styles.scss';


export const parseDate = (ts) => {
	const timestamp = new Date(ts).toISOString();
	return format(parseISO(timestamp), isToday(parseISO(timestamp)) ? 'HH:mm' : 'dddd HH:mm');
};

export const MessageTime = memo(({ ts, className, style = {} }) => (
	<time
		dateTime={new Date(ts).toISOString()}
		className={createClassName(styles, 'message-time', {}, [className])}
		style={style}
	>
		{parseDate(ts)}
	</time>
));
