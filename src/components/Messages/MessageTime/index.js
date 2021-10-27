import { parseISO } from 'date-fns/fp';
import isToday from 'date-fns/isToday';
import i18next from 'i18next';
import { h } from 'preact';

import { createClassName, memo } from '../../helpers';
import styles from './styles.scss';


export const parseDate = (ts) => {
	const timestamp = new Date(ts).toISOString();
	return i18next.t('message_time', {
		val: new Date(timestamp),
		formatParams: {
			val: isToday(parseISO(timestamp)) ? { hour: 'numeric', minute: 'numeric' } : { day: 'numeric', hour: 'numeric', minute: 'numeric' },
		},
	});
};

export const MessageTime = memo(({ ts, normal, inverted, className, style = {} }) => (
	<div className={createClassName(styles, 'message-time-wrapper')}>
		<time
			dateTime={new Date(ts).toISOString()}
			className={createClassName(styles, 'message-time', { normal, inverted }, [className])}
			style={style}
		>
			{parseDate(ts)}
		</time>
	</div>
));
