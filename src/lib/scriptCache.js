import { asyncForEach } from '../components/helpers';

class ScriptCache {
	constructor(scripts) {
		this.loaded = [];
		this.failed = [];
		this.load(scripts);
		setInterval(() => {
			this.load(this.failed);
		}, 10000);
	}

	load(scripts) {
		asyncForEach(scripts, async (script) => {
			await this.loadSrc(script);
		});
	}

	async loadSrc(src) {
		if (this.loaded.indexOf(src) >= 0) {
			return Promise.resolve(src);
		}

		return this.scriptTag(src)
			.then(() => {
				// handle success
				this.loaded = this.loaded.filter((script) => script !== src);
				this.loaded.push(src);
			})
			.catch((err) => {
				// handle cleanup
				this.failed = this.failed.filter((script) => script !== src);
				this.failed.push(src);
				console.error(err);
			});
	}

	scriptTag(src) {
		return new Promise((resolve, reject) => {
			const body = document.getElementsByTagName('body')[0];
			const tag = document.createElement('script');

			tag.type = 'text/javascript';
			tag.async = false; // Load in order

			const handleLoad = (evt) => {
				resolve(src);
			};
			const handleReject = (evt) => {
				reject(src);
			};

			tag.addEventListener('load', handleLoad);
			tag.addEventListener('error', handleReject);
			tag.src = src;
			body.appendChild(tag);
			return tag;
		});
	}
}

export const ScriptCacheInstance = new ScriptCache([]);
