import { h } from 'preact';

import { Livechat } from '../../api';
import { createClassName } from '../helpers';
import styles from './styles.scss';

const { localStorage } = window;
const storedState = JSON.parse(localStorage.getItem('store'));


export const CallIframe = () => {
	const url = `${ Livechat.client.host }/meet/${ storedState.room._id }?token=${ storedState.token }&id=${ storedState.user._id }`;
	return (
		<div className={createClassName(styles, 'call-iframe')}>
			<iframe className={createClassName(styles, 'call-iframe__content')} src={url} />
		</div>
	);
};
