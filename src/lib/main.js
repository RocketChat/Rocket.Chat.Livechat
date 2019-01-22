import { Livechat } from '../api';
import store from '../store';


export const loadConfig = async() => {
	const {
		token,
	} = store.state;

	Livechat.credentials.token = token;

	const {
		agent,
		room,
		guest: user,
		resources: { sound: src = null } = {},
		...config
	} = await Livechat.config({ token });

	await store.setState({
		config,
		agent,
		room,
		user,
		sound: { src, enabled: true, play: false },
		messages: [],
		alerts: [],
		noMoreMessages: false,
		visible: true,
		unread: null,
	});
};
