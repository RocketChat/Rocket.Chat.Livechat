import { h } from 'preact';
import { useState } from 'preact/compat';

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

// get roomid(DisolayIframe(rid)) and put rid id in iframe link
// <iframe style="height:80%" src="localhost:3000/livechat/roomId"></iframe>
// For example, for now I have add link of jitsi and its working fine, similarly we can add link of our video/audio call implemented with webrtc.
const DisplayIframe = (rid) => (
	<Screen.Content nopadding>
		<div className={createClassName(styles, 'iframe')}>
			<iframe style='height:100%' src='https://meet.jit.si/RocketChatXLKhe6QE6dyRLtTkX'{...rid} />
		</div>
	</Screen.Content>
);

// show call start time function.
export const ShowCallTime = (props) => (
	<div className={createClassName(styles, 'callTime')}>
		<time
			dateTime={new Date(props.stime).toISOString()}>
			<div>Call started at {parseDate(props.stime)}</div>
		</time>
	</div>
);

// join call button function.
export const ShowJoinCallButton = (props) => (
	<div className={createClassName(styles, 'joinCallBox')}>
		<div className={createClassName(styles, 'joinMessage')} >
			<div className={createClassName(styles, 'videoIcon')} >
				<VideoIcon width={20} height={20} />
			</div>
			{I18n.t('Join my room to start the video call')}
		</div>
	    <a className={createClassName(styles, 'joinLink')} rel='noreferrer' target='_blank' href={`https://meet.jit.si/RocketChatXLKhe6QE6dyRLtTkX${ props.roomId.rid }`} > <VideoIcon width={20} height={20} /> Join Call </a>
	</div>
);


// call notification with accept and reject option.
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
				<div className={createClassName(styles, 'call')}>
					<div className={createClassName(styles, 'avatar')}>
						<Avatar
							src={getAvatarUrl(props.rid.u.username)}
						/></div>
					Incoming video Call
					<div className={createClassName(styles, 'btn')}>
						<Button onClick={declineClick} className={createClassName(styles, 'btn1')}> <PhoneDecline width={20} height={20} /> Decline</Button>
						<Button onClick={acceptClick} className={createClassName(styles, 'btn2')} > <PhoneAccept width={20} height={20} /> Accept</Button></div></div></Screen.Content>) : null}
			{timeout()}
			{isframe ? (<DisplayIframe session={props.rid} />) : null }
		</div>);
};
