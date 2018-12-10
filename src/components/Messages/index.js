import { h, Component } from 'preact';
import Message from 'components/Message';
import { getAvatarUrl, getAttachmentsUrl } from '../helpers';

export default class Messages extends Component {

	render({ messages, user, ...args }) {
		return (
			<ol style="padding:0;">{
				messages.map((message, index, arr) => {
					const next = arr[index + 1];
					const { u = {}, _id, attachments } = message;
					const group = next && next.u._id === u._id;
					const username = u._id && u.username;
					return <Message {...message} group={group} key={_id} el="li" me={user && user._id === u._id} avatarUrl={getAvatarUrl(username)} attachmentsUrl={getAttachmentsUrl(attachments)} />;
				})
			}</ol>
		)
	}
}
