import { h } from 'preact';
import { useState } from 'preact/compat';

import { Livechat } from '../../../api';
import I18n from '../../../i18n';
import PhoneAccept from '../../../icons/phone.svg';
import PhoneDecline from '../../../icons/phoneOff.svg';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { Screen } from '../../Screen';
import { createClassName, getAvatarUrl } from '../../helpers';
import styles from './styles.scss';


const DisplayCallIframe = (rid) => (
	<Screen.Content nopadding>
		<div className={createClassName(styles, 'iframe')}>
			<iframe style='height:100%' src={`${ Livechat.client.host }/meet/${ rid.rid }`} />
		</div>
	</Screen.Content>
);


export const CallNotification = (props) => {
	const [isframe, setIframe] = useState(false);
	const [show, setShow] = useState(true);

	const acceptClick = async () => {
		setShow(!{ show });
		if (props.rid.t === 'jitsi_call_started') {
			try {
				const result = await Livechat.videoCall(props.rid);
				window.open(`https://${ result.videoCall.domain }/${ result.videoCall.room }`);
				return;
			} catch (error) {
				console.error(error);
				return;
			}
		}
		setIframe(true);
	};

	const declineClick = () => {
		setShow(false);
	};

	return (
		<div>
			{ show ? (<Screen.Content nopadding>
				<div className={createClassName(styles, 'notifyCall')}>
					<div className={createClassName(styles, 'avatar')}>
						<Avatar
							src={getAvatarUrl(props.rid.u.username)}
						/></div>
					{I18n.t('Incoming video Call')}
					<div className={createClassName(styles, 'button')}>
						<Button onClick={declineClick} className={createClassName(styles, 'declineButton')}> <PhoneDecline width={20} height={20} /> <span style='margin-left:5px'> {I18n.t('Decline')} </span> </Button>
						<Button onClick={acceptClick} className={createClassName(styles, 'acceptButton')} > <PhoneAccept width={20} height={20} /> <span style='margin-left:5px'> {I18n.t('Accept')} </span> </Button></div></div></Screen.Content>) : null}
			{isframe ? (<DisplayCallIframe session={props.rid.rid} />) : null }
		</div>);
};
