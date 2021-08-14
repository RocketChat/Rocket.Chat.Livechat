import { h } from 'preact';

import { Livechat } from '../../api';
import store from '../../store';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const CallIframe = () => {
	const { token, room, incomingCallAlert } = store.state;
	const url = `${ Livechat.client.host }meet/${ room._id }?token=${ token }&layout=embedded`;
	window.handleIframeClose = async () => store.setState({ incomingCallAlert: {
		show: false,
		callProvider: incomingCallAlert.callProvider,
		callerUsername: incomingCallAlert.callerUsername,
		rid: incomingCallAlert.rid,
		time: incomingCallAlert.time,
	} });
	window.expandCall = async () => {
		window.open(
			`${ Livechat.client.host }meet/${ room._id }?token=${ token }`,
			room._id,
		);
		return store.setState({ incomingCallAlert: {
			show: false,
			callProvider: incomingCallAlert.callProvider,
			callerUsername: incomingCallAlert.callerUsername,
			rid: incomingCallAlert.rid,
			time: incomingCallAlert.time,
		} });
	};
	return (
		<div className={createClassName(styles, 'call-iframe')}>
			<iframe className={createClassName(styles, 'call-iframe__content')} allow='camera;microphone' src={url} />
		</div>
	);
};
