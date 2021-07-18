import { h } from 'preact';
import { useState } from 'preact/compat';

import { Livechat } from '../../api';
import I18n from '../../i18n';
import PhoneAccept from '../../icons/phone.svg';
import PhoneDecline from '../../icons/phoneOff.svg';
import constants from '../../lib/constants';
import { store } from '../../store';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { createClassName, getAvatarUrl, createToken } from '../helpers';
import styles from './styles.scss';


export const CallNotification = ({ callProvider, callerUsername, roomId, dispatch } = { callProvider: undefined, callerUsername: undefined, roomId: undefined, dispatch: undefined }) => {
	const [show, setShow] = useState(!!callProvider && !!callerUsername && !!roomId && !!dispatch);

	const acceptClick = async () => {
		setShow(!{ show });

		switch (callProvider) {
			case constants.jitsiCallStartedMessageType: {
				const { state } = store;
				const { alerts } = state;
				try {
					const result = await Livechat.videoCall(roomId);
					window.open(`https://${ result.videoCall.domain }/${ result.videoCall.room }`); // TODO: get this url from the message payload instead and infuture get it from the video call event
				} catch (error) {
					console.error(error);
					const alert = { id: createToken(), children: I18n.t('error_accepting_jitsi_call'), error: true, timeout: 5000 };
					await dispatch({ alerts: (alerts.push(alert), alerts) });
				}
				await dispatch({ incomingCallAlert: null });
				break;
			}
			case constants.webrtcCallStartedMessageType: {
				// TODO: add webrtc code here
				break;
			}
		}
	};

	const declineClick = async () => {
		await dispatch({ incomingCallAlert: null });
	};

	return (
		<div className={createClassName(styles, 'call-notification')}>
			{ show
				? (
					<div className={createClassName(styles, 'call-notification__content')}>
						<div className={createClassName(styles, 'call-notification__content-avatar')}>
							<Avatar
								src={getAvatarUrl(callerUsername)}
								large
							/>
						</div>
						<div className={createClassName(styles, 'call-notification__content-message')}>
							{ I18n.t('Incoming video Call') }
						</div>
						<div className={createClassName(styles, 'call-notification__content-actions')}>
							<Button onClick={declineClick} className={createClassName(styles, 'call-notification__content-actions-accept')}>
								<PhoneDecline width={20} height={20} /> <span style='margin-left:5px'> {I18n.t('Decline')} </span>
							</Button>
							<Button onClick={acceptClick} className={createClassName(styles, 'call-notification__content-actions-decline')} >
								<PhoneAccept width={20} height={20} /><span style='margin-left:5px'> {I18n.t('Accept')} </span>
							</Button>
						</div>
					</div>
				)
				: null
			}
		</div>);
};
