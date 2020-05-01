import { Component } from 'preact';

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
