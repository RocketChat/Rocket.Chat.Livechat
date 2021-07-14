import { h } from 'preact';
import { useState } from 'preact/compat';

import { Livechat } from '../../../api';
import I18n from '../../../i18n';
import PhoneAccept from '../../../icons/phone.svg';
import PhoneDecline from '../../../icons/phoneOff.svg';
import VideoIcon from '../../../icons/video.svg';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { Screen } from '../../Screen';
import { createClassName, getAvatarUrl } from '../../helpers';
import { parseDate } from '../MessageTime/index';
import styles from './styles.scss';


const DisplayCallIframe = (rid) => (
	<Screen.Content nopadding>
		<div className={createClassName(styles, 'iframe')}>
			<iframe style='height:100%' src={`${ Livechat.client.host }/meet/${ rid.rid }`} />
		</div>
	</Screen.Content>
);


export const ShowCallTime = (props) => (
	<div className={createClassName(styles, 'callTime')}>
		<time
			dateTime={new Date(props.stime).toISOString()}>
			<div>{I18n.t('Call started at ')}{parseDate(props.stime)}</div>
		</time>
	</div>
);

export const ShowJoinCallButton = (props) => {
	const clickJoinCall = () => {
		window.open(`${ Livechat.client.host }/meet/${ props.roomId.rid }`);
	};
	return (
		<div className={createClassName(styles, 'joinCallBox')}>
			<div className={createClassName(styles, 'joinMessage')} >
				<div className={createClassName(styles, 'videoIcon')} >
					<VideoIcon width={20} height={20} />
				</div>
				{I18n.t('Join my room to start the video call')}
			</div>
			<Button onClick={clickJoinCall} className={createClassName(styles, 'joinLink')}> <VideoIcon width={20} height={20} />  {I18n.t('Join Call')} </Button>
	    </div>
	);
};

export const CallNotification = (props) => {
	const [isframe, setIframe] = useState(false);
	const [show, setShow] = useState(true);

	const acceptClick = () => {
		setShow(!{ show });
		setIframe(true);
	};

	const declineClick = () => {
		setShow(false);
	};

	const timeout = () => {
		setTimeout(function() { setShow(false); }, 20000);
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
			{timeout()}
			{isframe ? (<DisplayCallIframe session={props.rid.rid} />) : null }
		</div>);
};
