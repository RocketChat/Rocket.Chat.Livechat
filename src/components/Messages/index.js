import { h, Component } from 'preact';
import Message from 'components/Message';

export default class Messages extends Component {

	render({ messages, user, ...args }) {
		return (
			<ol style="padding:0;">{
				messages.map((el, index, arr) => {
					const next = arr[index + 1];
					const group = next && next.u._id === el.u._id;
					const { u = {}, _id } = el;
					return <Message group={group} message={el} {...args} key={_id} el="li" me={user && user._id === u._id} />;
				})
			}</ol>
		)
	}
}
