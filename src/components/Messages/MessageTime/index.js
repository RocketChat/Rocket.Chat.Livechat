import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { parseISO } from 'date-fns/fp';

import { createClassName, memo } from '../../helpers';
import styles from './styles.scss';


export const parseDate = (ts) => format(ts, isToday(parseISON(ts)) ? 'HH:mm' : 'dddd HH:mm');

export const MessageTime = memo(({ ts, className, style = {} }) => (
	<time
		dateTime={new Date(ts).toISOString()}
		className={createClassName(styles, 'message-time', {}, [className])}
		style={style}
	>
		{parseDate(ts)}
	</time>
));
