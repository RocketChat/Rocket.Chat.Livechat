import { Component } from 'preact';

import { Livechat } from '../api';
import store from '../store';

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
	...flatMap(Object.entries(modifiers), ([modifierKey, modifierValue]) => [
		modifierValue && styles[`${ elementName }--${ modifierKey }`],
		typeof modifierValue !== 'boolean' && styles[`${ elementName }--${ modifierKey }-${ modifierValue }`],
	]).filter((className) => !!className), ...classes.filter((className) => !!className)].join(' ');

export async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		// eslint-disable-next-line no-await-in-loop
		await callback(array[index], index, array);
	}
}

export async function asyncEvery(array, callback) {
	for (let index = 0; index < array.length; index++) {
		// eslint-disable-next-line no-await-in-loop
		if (!await callback(array[index], index, array)) {
			return false;
		}
	}
	return true;
}

export const debounce = (func, delay) => {
	let inDebounce;

	function f(...args) {
		const context = this;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
		return context;
	}

	f.stop = () => clearTimeout(inDebounce);

	return f;
};

export const throttle = (func, limit) => {
	let inThrottle;
	return function(...args) {
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, limit);
		}
	};
};

export function getInsertIndex(array, item, ranking) {
	const order = ranking(item);
	let min = 0;
	let max = array.length - 1;

	while (min <= max) {
		const guess = Math.floor((min + max) / 2);
		const guessedOrder = ranking(array[guess]);
		if (guessedOrder < order) {
			min = guess + 1;
		} else if (guessedOrder > array[guess + 1]) {
			return guess;
		} else {
			max = guess - 1;
		}
	}

	return array.length > 0 ? array.length : 0;
}

export function upsert(array = [], item, predicate, ranking) {
	const index = array.findIndex(predicate);

	if (index > -1) {
		array[index] = item;
		return array;
	}

	array.splice(getInsertIndex(array, item, ranking), 0, item);
	return array;
}

export const setCookies = (rid, token) => {
	document.cookie = `rc_rid=${ rid }; path=/`;
	document.cookie = `rc_token=${ token }; path=/`;
	document.cookie = 'rc_room_type=l; path=/';
};

export const createToken = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const getAvatarUrl = (username) => (username ? `${ Livechat.client.host }/avatar/${ username }` : null);

export const msgTypesNotRendered = ['livechat_video_call', 'livechat_navigation_history', 'au', 'command', 'livechat-close'];

export const canRenderMessage = (message = {}) => !msgTypesNotRendered.includes(message.t);

export const getAttachmentUrl = (url) => `${ Livechat.client.host }${ url }`;

export const sortArrayByColumn = (array, column, inverted) => array.sort((a, b) => {
	if (a[column] < b[column] && !inverted) {
		return -1;
	}
	return 1;
});

export const parseOfflineMessage = (fields = {}) => {
	const host = window.location.origin;
	return Object.assign(fields, { host });
};
export const normalizeDOMRect = ({ left, top, right, bottom }) => ({ left, top, right, bottom });


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


export class MemoizedComponent extends Component {
	shouldComponentUpdate(nextProps) {
		const { props } = this;

		for (const key in props) {
			if (props[key] !== nextProps[key]) {
				return true;
			}
		}

		for (const key in nextProps) {
			if (!(key in props)) {
				return true;
			}
		}

		return false;
	}
}

export const memo = (component) =>
	class extends MemoizedComponent {
		render = component
	};

export const mobileCheck = () => {
	let check = false;
	// eslint-disable-next-line wrap-iife
	(function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { check = true; } })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

export const isActiveSession = () => {
	const sessionId = sessionStorage.getItem('sessionId');
	const { openSessionIds: [firstSessionId] = [] } = store.state;

	return sessionId === firstSessionId;
};
