import moment from 'moment';
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
	console.log('zer', callDuration);
	const time = moment(props.endTime).format('h:mm A');
	console.log('bdf', time);
	return (
		<div className={createClassName(styles, 'callTime')}>
			{I18n.t('Call ended at %{time}', { time })}
			{I18n.t(' - Lasted %{callDuration}', { callDuration })}
		</div>
	);
};
