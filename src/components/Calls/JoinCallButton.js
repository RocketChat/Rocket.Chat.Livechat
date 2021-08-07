import { h } from 'preact';

import { Livechat } from '../../api';
import I18n from '../../i18n';
import VideoIcon from '../../icons/video.svg';
import constants from '../../lib/constants';
import store from '../../store';
import { Button } from '../Button';
import { createClassName, createToken } from '../helpers';
import styles from './styles.scss';


export const JoinCallButton = (props) => {
	const { token, room } = store.state;
	const clickJoinCall = async () => {
		const { alerts } = store.state;
		switch (props.callProvider) {
			case constants.jitsiCallStartedMessageType: {
				window.open(props.url);
				break;
			}
			case constants.webrtcCallStartedMessageType: {
				window.open(`${ Livechat.client.host }/meet/${ room._id }?token=${ token }`);
				break;
			}
			default: {
				const alert = { id: createToken(), children: I18n.t('Call already ended'), timeout: 5000 };
				await store.setState({ alerts: (alerts.push(alert), alerts) });
			}
		}
	};
	return (<div>
		{ props.callStatus === 'accept'
			? <div className={createClassName(styles, 'joinCall')}>
				<div className={createClassName(styles, 'joinCall__content')} >
					<div className={createClassName(styles, 'joinCall__content-videoIcon')} >
						<VideoIcon width={20} height={20} />
					</div>
					{I18n.t('Join my room to start the video call')}
				</div>
				<Button onClick={clickJoinCall} className={createClassName(styles, 'joinCall__content-action')}> <VideoIcon width={20} height={20} /> {I18n.t('Join Call')} </Button>
	    </div> : null } </div>
	);
};
