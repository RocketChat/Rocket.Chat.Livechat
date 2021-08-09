import { h } from 'preact';

import { Livechat } from '../../api';
import store from '../../store';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const CallIframe = (props) => {
	const { token, room } = store.state;
	const url = `${ Livechat.client.host }/meet/${ room._id }?token=${ token }`;
	const callInNewTab = async () => {
		window.open(url);
		await store.setState({ ongoingCall: { callStatus: 'ongoingCallInNewTab', time: props.time } });
		await store.setState({ incomingCallAlert: { show: false, callProvider: props.callProvider } });
	};
	return (
		<div>
			{(window.innerWidth <= 800) && (window.innerHeight <= 630)
				? <div className={createClassName(styles, 'call-iframe')}> <iframe className={createClassName(styles, 'call-iframe__content')} allow='camera;microphone' src={url} />
				</div> : callInNewTab() }
		</div>
	);
};
