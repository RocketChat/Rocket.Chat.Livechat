import format from 'date-fns/format';
import { parseISO } from 'date-fns/fp';
import isToday from 'date-fns/isToday';
import { h } from 'preact';

import I18n from '../../i18n';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const ShowCallTime = (callStatus) => {
	const timestamp = new Date().toISOString();
	const time = format(parseISO(timestamp), isToday(parseISO(timestamp)) ? 'HH:mm' : 'dddd HH:mm');
	if (callStatus === 'ended') {
		return (<div className={createClassName(styles, 'callTime')}>
			{I18n.t('Call ended at %{time}', { time })}
		</div>);
	}
	return ((<div className={createClassName(styles, 'callTime')}>
		{I18n.t('Call started at %{time}', { time })}
	</div>));
};
