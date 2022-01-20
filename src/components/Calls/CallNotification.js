import { h } from 'preact';
import { useState } from 'preact/compat';

import { Livechat } from '../../api';
import I18n from '../../i18n';
import PhoneAccept from '../../icons/phone.svg';
import PhoneDecline from '../../icons/phoneOff.svg';
import constants from '../../lib/constants';
import store from '../../store';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { createClassName, getAvatarUrl, isMobileDevice } from '../helpers';
import { CallStatus } from './CallStatus';
import styles from './styles.scss';


export const CallNotification = ({
	callProvider,
	callerUsername,
	url,
	dispatch,
	time,
	rid,
	callId,
}) => {
	const [show, setShow] = useState(true);

	const callInNewTab = async () => {
		const { token } = store.state;
		const url = `${ Livechat.client.host }/meet/${ rid }?token=${ token }`;
		await dispatch({
			ongoingCall: {
				callStatus: CallStatus.IN_PROGRESS_DIFFERENT_TAB,
				time: { time },
			},
			incomingCallAlert: {
				show: false,
				callProvider,
			},
		});
		window.open(url, rid);
	};

	const acceptClick = async () => {
		setShow(!{ show });
		switch (callProvider) {
			case constants.jitsiCallStartedMessageType: {
				window.open(url, rid);
				await dispatch({
					incomingCallAlert: { show: false, url, callProvider },
					ongoingCall: {
						callStatus: CallStatus.IN_PROGRESS_DIFFERENT_TAB,
						time: { time },
					},
				});
				break;
			}
			case constants.webRTCCallStartedMessageType: {
				await Livechat.updateCallStatus(CallStatus.IN_PROGRESS, rid, callId);
				if (isMobileDevice()) {
					callInNewTab();
					break;
				}
				await dispatch({ ongoingCall: { callStatus: CallStatus.IN_PROGRESS_SAME_TAB, time: { time } } });
				break;
			}
		}
	};

	const declineClick = async () => {
		await Livechat.updateCallStatus(CallStatus.DECLINED, rid, callId);
		await Livechat.notifyCallDeclined(rid);
		await dispatch({
			incomingCallAlert: null,
			ongoingCall: {
				callStatus: CallStatus.DECLINED,
				time: { time },
			},
		});
	};

	return (
		<div className={createClassName(styles, 'call-notification')}>
			{
				show && (
					<div className = { createClassName(styles, 'call-notification__content') }>
						<div className = { createClassName(styles, 'call-notification__content-avatar') }>
							<Avatar src = { getAvatarUrl(callerUsername) } large />
						</div>
						<div className = { createClassName(styles, 'call-notification__content-message') }>
							{ I18n.t('Incoming video Call') }
						</div>
						<div className = { createClassName(styles, 'call-notification__content-actions') }>
							<Button
								onClick = { declineClick }
								className = { createClassName(styles, 'call-notification__content-actions-decline') }>
								<PhoneDecline width = {	20 } height = { 20 } />
								<span style='margin-left:5px'> {I18n.t('Decline')} </span >
							</Button>
							<Button onClick = { acceptClick }
								className = {createClassName(styles, 'call-notification__content-actions-accept') }>
								<PhoneAccept width = { 20 } height = { 20} />
								<span style='margin-left:5px'> {I18n.t('Accept')} </span >
							</Button>
						</div>
					</div>
				)
			}
		</div>
	);
};
