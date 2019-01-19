import queryString from 'query-string';
import LivechatClient from '@rocket.chat/sdk/lib/clients/Livechat';


const {
	serverUrl = process.env.NODE_ENV === 'development' && 'http://localhost:3000',
} = queryString.parse(window.location.search);

export const Livechat = new LivechatClient({ host: serverUrl, protocol: 'ddp' });
