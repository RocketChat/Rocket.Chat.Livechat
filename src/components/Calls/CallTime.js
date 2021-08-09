import format from 'date-fns/format';
import { parseISO } from 'date-fns/fp';
import isToday from 'date-fns/isToday';
import { h } from 'preact';

import I18n from '../../i18n';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const CallTime = (props) => {
	const hh = parseInt(Math.abs(props.endTime - props.time) / 36e5);
	const mm = parseInt(Math.abs(props.endTime - props.time) / 6e4) % 60;
	const ss = parseInt(Math.abs(props.endTime - props.time) / 1000) % 60;
	let callDuration = '';
	if (hh > 0) {
		callDuration += `${ hh } hours ${ mm } minutes ${ ss } seconds.`;
	} else if (mm > 0) {
		callDuration += `${ mm } minutes ${ ss } seconds.`;
	} else {
		callDuration += `${ ss } seconds.`;
	}
	const timestamp = new Date(props.endTime).toISOString();
	const time = format(parseISO(timestamp), isToday(parseISO(timestamp)) ? 'HH:mm' : 'dddd HH:mm');
	return (
		<div className={createClassName(styles, 'callTime')}>
			{I18n.t('Call ended at %{time}', { time })}
			{I18n.t(' - Lasted %{callDuration}', { callDuration })}
		</div>
	);
};
