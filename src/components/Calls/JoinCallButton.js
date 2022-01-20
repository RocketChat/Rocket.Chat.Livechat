import { h } from 'preact';

import { Livechat } from '../../api';
import I18n from '../../i18n';
import VideoIcon from '../../icons/video.svg';
import constants from '../../lib/constants';
import store from '../../store';
import { Button } from '../Button';
import { createClassName } from '../helpers';
import { isCallOngoing } from './CallStatus';
import styles from './styles.scss';


export const JoinCallButton = (props) => {
	const { token, room } = store.state;

	const clickJoinCall = () => {
		switch (props.callProvider) {
			case constants.jitsiCallStartedMessageType: {
				window.open(props.url, room._id);
				break;
			}
			case constants.webRTCCallStartedMessageType: {
				window.open(`${ Livechat.client.host }/meet/${ room._id }?token=${ token }`, room._id);
				break;
			}
		}
	};
	return (
		<div className={createClassName(styles, 'joinCall')}>
			{
				isCallOngoing(props.callStatus)
				&& (
					<div>
						<div className={createClassName(styles, 'joinCall__content')} >
							<div className={createClassName(styles, 'joinCall__content-videoIcon')} >
								<VideoIcon width={20} height={20} />
							</div>
							{ I18n.t('Join my room to start the video call') }
						</div>
						<Button onClick={clickJoinCall} className={createClassName(styles, 'joinCall__content-action')}>
							<VideoIcon width={20} height={20} />
							{I18n.t('Join Call')}
						</Button>
					</div>
				)
			}
		</div>
	);
};
