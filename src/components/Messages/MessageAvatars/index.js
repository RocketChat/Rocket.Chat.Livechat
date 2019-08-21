import { Avatar } from '../../Avatar';
import { createClassName, memo, getUserName } from '../../helpers';
import styles from './styles.scss';

export const MessageAvatars = memo(({
	avatarResolver = () => null,
	usernames = [],
	className,
	style = {},
	me,
	showAgentInfo,
	defaultAgentUsername,
}) => (
	<div
		className={createClassName(styles, 'message-avatars', {}, [className])}
		style={style}
	>
		{usernames.map((username) => (
			<Avatar
				src={avatarResolver(getUserName(me, showAgentInfo, defaultAgentUsername, username))}
				description={getUserName(me, showAgentInfo, defaultAgentUsername, username)}
				className={createClassName(styles, 'message-avatars__avatar')}
			/>
		))}
	</div>
));
