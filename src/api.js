import queryString from 'query-string';
import LivechatClient from '@rocket.chat/sdk/lib/clients/Livechat';

const host = (
	(window.__meteor_runtime_config__ && window.__meteor_runtime_config__.ROOT_URL) ||
	queryString.parse(window.location.search).serverUrl ||
	(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null)
);

export const Livechat = new LivechatClient({ host, protocol: 'ddp' });
