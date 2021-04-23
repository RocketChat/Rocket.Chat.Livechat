import { h } from 'preact';

import { Livechat } from '../../../api';
import store from '../../../store';
import { createClassName, memo } from '../../helpers';
import { MessageBubble } from '../MessageBubble';
import styles from './styles.scss';

function generateRandomString(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export const MessageAction = memo(({
	url,
	className,
	actions,
	resetLastAction,
	closeChat = async () => {
		const rid = store.state.room._id;

		await Promise.all([
			Livechat.closeChat({ rid }),
		]);
	},
	randomWord = async () => {
		const { token } = store.state;
		const rid = store.state.room._id;

		const randommsg = generateRandomString(5);

		await Promise.all([
			Livechat.sendMessage({ msg: randommsg, token, rid }),
		]);
	},
	getSessionId = async () => {
		const { token } = store.state;
		const rid = store.state.room._id;

		await Promise.all([
			Livechat.sendMessage({ msg: 'initiate_salesforce_session', token, rid }),
		]);
	},
	sendMessage = async (el) => {
		const { token } = store.state;
		const rid = store.state.room._id;

		resetLastAction();

		await Promise.all([
			Livechat.sendMessage({ msg: el.target.value, token, rid }),
		]);
	},
	addButton = (text, msg) => {
		if (msg === 'getSessionId') {
			return <button onClick={getSessionId} className={createClassName(styles, 'button', {}, [className])}>{text}</button>;
		} if (msg === 'randomWord') {
			return <button onClick={randomWord} className={createClassName(styles, 'button', {}, [className])}>{text}</button>;
		} if (msg === 'closeChat') {
			return <button onClick={closeChat} className={createClassName(styles, 'button', {}, [className])}>{text}</button>;
		}
		return <button onClick={sendMessage} value={msg} className={createClassName(styles, 'button', {}, [className])}>{text}</button>;
	},
	...messageBubbleProps
}) => (
	<MessageBubble
		nude
		className={createClassName(styles, 'attachment-component', {}, [className])}
		{...messageBubbleProps}
	>
		{actions.map(({ text, msg }) =>
			addButton(text, msg),
		)}
	</MessageBubble>
));
