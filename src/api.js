import Livechat from '@rocket.chat/sdk/lib/clients/Livechat';


class TMP extends Livechat {
	livechatStream = 'stream-livechat-room'
	async onAgentChange(rid, cb) {
		await this.subscribe(this.livechatStream, rid);
		const socket = (await this.socket);
		socket.ddp.on(this.livechatStream, ({ fields: { args: [{ type, data }] } }) => {
			if (type === 'agentData') {
				return cb(data);
			}
		});
	}
	async subscribe(topic, args) {
		const { token } = this.credentials;
		return (await this.socket).subscribe(topic, args, { token, visitorToken: token });
	}

	subscribeRoom(rid) {
		const { token } = this.credentials;
		return super.subscribeRoom(rid, { token, visitorToken: token });
	}
}

class L {
	debug(...args) {
		console.log(...args);
	}
	info(...args) {
		console.log(...args);
	}
	warning(...args) {
		console.warn(...args);
	}
	warn(...args) { // legacy method
		return this.warning(...args);
	}
	error(...args) {
		console.error(...args);
	}
}
const livechat = new TMP({ host: 'http://localhost:3000', protocol: 'ddp', logger: new L() });
export default livechat;
