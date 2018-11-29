import format from 'date-fns/format';
import isToday from 'date-fns/is_today';

function flatMap(arr, mapFunc) {
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

export const parseDate = (ts) => format(ts, isToday(ts) ? 'HH:mm' : 'dddd HH:mm');

export const systemMessage = (t) => (['s', 'p', 'f', 'r', 'au', 'ru', 'ul', 'wm', 'uj', 'livechat-close'].includes(t)) && 'system';

export const parseMessage = (args, msg) => {
	const { u: { username }, t } = args;
	switch (t) {
		case 'r':
			return I18n.t('Room_name_changed', { room_name: msg, user_by: username });
		case 'au':
			return I18n.t('User_added_by', { user_added: msg, user_by: username });
		case 'ru':
			return I18n.t('User_removed_by', { user_removed: msg, user_by: username });
		case 'wm':
			return I18n.t('Welcome', { user: username });
		// case 'livechat-close':
		// return (Livechat.conversationFinishedMessage) ? Livechat.conversationFinishedMessage : t('Conversation_finished');
		default:
			return msg;
	}
};

export const setCookies = ({ room, user }) => {
	if (room && user && user.token) {
		document.cookie = `rc_rid=${ room._id }; path=/`;
		document.cookie = `rc_token=${ user.token }; path=/`;
		document.cookie = 'rc_room_type=l; path=/';
	}
};
