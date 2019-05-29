import queryString from 'query-string';
import LivechatClient from '@rocket.chat/sdk/lib/clients/Livechat';

const host = (
	window.SERVER_URL ||
	queryString.parse(window.location.search).serverUrl ||
  (process.env.NODE_ENV === 'development' ? 'https://e30b913c.ngrok.io' : null)
);

const useSsl = host && host.match(/^https:/) !== null;

export const Livechat = new LivechatClient({ host, protocol: 'ddp', useSsl });
