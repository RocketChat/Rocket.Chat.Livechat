import { h } from 'preact';

import { Livechat } from '../../api';
import store from '../../store';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const CallIframe = () => {
	const { token, room } = store.state;
	const url = `${ Livechat.client.host }/meet/${ room._id }?token=${ token }`;
	return (
		<div className={createClassName(styles, 'call-iframe')}>
			<iframe className={createClassName(styles, 'call-iframe__content')} allow='camera;microphone' src={url} />
		</div>
	);
};
