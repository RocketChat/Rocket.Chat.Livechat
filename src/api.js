import LivechatClient from '@rocket.chat/sdk/lib/clients/Livechat';

export let Livechat;

export const initializeLivechat = async(...args) => {
	Livechat = new LivechatClient(...args);
	Livechat.connect();
};
