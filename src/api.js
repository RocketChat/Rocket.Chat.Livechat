import LivechatClient from '@rocket.chat/sdk/lib/clients/Livechat';

export let Livechat;

export const initializeLivechat = (...args) => {
	Livechat = new LivechatClient(...args);
};
