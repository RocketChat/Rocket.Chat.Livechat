import { Livechat } from '../api';


export function flatMap(arr, mapFunc) {
	const result = [];
	for (const [index, elem] of arr.entries()) {
		const x = mapFunc(elem, index, arr);
		// We allow mapFunc() to return non-Arrays
		if (Array.isArray(x)) {
			result.push(...x);
		} else {
			result.push(x);
		}
	}
	return result;
}

export const createClassName = (styles, elementName, modifiers = {}, classes = []) => [
	styles[elementName],
	...(flatMap(Object.entries(modifiers), ([modifierKey, modifierValue]) => [
		modifierValue && styles[`${ elementName }--${ modifierKey }`],
		typeof modifierValue !== 'boolean' && styles[`${ elementName }--${ modifierKey }-${ modifierValue }`],
	]).filter((className) => !!className)), ...classes].join(' ');

export async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

export async function asyncEvery(array, callback) {
	for (let index = 0; index < array.length; index++) {
		if (!await callback(array[index], index, array)) {
			return false;
		}
	}
	return true;
}

export const debounce = (func, delay) => {
	let inDebounce;
	return function(...args) {
		const context = this;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
};

export const throttle = (func, limit) => {
	let inThrottle;
	return function(...args) {
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	};
};

export function sort(array, value) {
	let min = 0;
	let max = array.length - 1;

	while (min <= max) {
		const guess = Math.floor((min + max) / 2);
		const { ts } = array[guess];
		if (ts < value) {
			min = guess + 1;
		} else if (ts > array[guess + 1]) {
			return guess;
		} else {
			max = guess - 1;
		}
	}

	return array.length > 0 ? array.length : 0;
}

export const insert = (array, el) => (array.splice(sort(array, el.ts), 0, el), array);

export const setCookies = (rid, token) => {
	document.cookie = `rc_rid=${ rid }; path=/`;
	document.cookie = `rc_token=${ token }; path=/`;
	document.cookie = 'rc_room_type=l; path=/';
};

export const createToken = () => (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

export const getAvatarUrl = (username) => (username && `${ Livechat.client.host }/avatar/${ username }`);

export const msgTypesNotDisplayed = ['livechat_video_call', 'livechat_navigation_history', 'au'];

export const renderMessage = (message = {}) => (message.t !== 'command' && !msgTypesNotDisplayed.includes(message.t));

export const getAttachmentsUrl = (attachments) => attachments && attachments.map((attachment) => {
	const assetUrl = attachment.image_url || attachment.video_url || attachment.audio_url || attachment.title_link;
	return { ...attachment, attachment_url: `${ Livechat.client.host }${ assetUrl }` };
});

export const normalizeDOMRect = (({ left, top, right, bottom }) => ({ left, top, right, bottom }));


export const visibility = (() => {
	if (typeof document.hidden !== 'undefined') {
		return {
			get hidden() {
				return document.hidden;
			},
			addListener: (f) => document.addEventListener('visibilitychange', f, false),
			removeListener: (f) => document.removeEventListener('visibilitychange', f, false),
		};
	}

	if (typeof document.msHidden !== 'undefined') {
		return {
			get hidden() {
				return document.msHidden;
			},
			addListener: (f) => document.addEventListener('msvisibilitychange', f, false),
			removeListener: (f) => document.removeEventListener('msvisibilitychange', f, false),
		};
	}

	if (typeof document.webkitHidden !== 'undefined') {
		return {
			get hidden() {
				return document.webkitHidden;
			},
			addListener: (f) => document.addEventListener('webkitvisibilitychange', f, false),
			removeListener: (f) => document.removeEventListener('webkitvisibilitychange', f, false),
		};
	}

	return {
		hidden: true,
		addListener: () => {},
		removeListener: () => {},
	};
})();
