import Livechat from '@rocket.chat/sdk/lib/clients/Livechat';
const livechat = new Livechat({ host: 'http://localhost:3000', protocol: 'ddp' });
export default livechat;
