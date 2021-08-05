import { h } from 'preact';
import { useState } from 'preact/compat';

import I18n from '../../i18n';
import PhoneAccept from '../../icons/phone.svg';
import PhoneDecline from '../../icons/phoneOff.svg';
import constants from '../../lib/constants';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { createClassName, getAvatarUrl } from '../helpers';
import styles from './styles.scss';


export const CallNotification = ({ callProvider, callerUsername, url, dispatch, time } = { callProvider: undefined, callerUsername: undefined, dispatch: undefined, time: undefined }) => {
	const [show, setShow] = useState(true);

	const acceptClick = async () => {
		setShow(!{ show });
		switch (callProvider) {
			case constants.jitsiCallStartedMessageType: {
				window.open(url);
				break;
			}
			case constants.webrtcCallStartedMessageType: {
				// TODO: add webrtc code here
				await dispatch({ ongoingCall: { callStatus: 'accept', time: { time } } });
				break;
			}
		}
	};

	const declineClick = async () => {
		await dispatch({ incomingCallAlert: null });
		await dispatch({ ongoingCall: { callStatus: 'decline', time: { time } } });
	};

	return (
		<div>
			{ show
				? (
					<div className={createClassName(styles, 'call-notification')}>
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
								<Button onClick={declineClick} className={createClassName(styles, 'call-notification__content-actions-decline')}>
									<PhoneDecline width={20} height={20} /> <span style='margin-left:5px'> {I18n.t('Decline')} </span>
								</Button>
								<Button onClick={acceptClick} className={createClassName(styles, 'call-notification__content-actions-accept')} >
									<PhoneAccept width={20} height={20} /><span style='margin-left:5px'> {I18n.t('Accept')} </span>
								</Button>
							</div>
						</div>
					</div>
				)
				: null
			}
		</div>);
};
