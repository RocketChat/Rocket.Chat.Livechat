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
	])
		.filter((className) => !!className)), ...classes].join(' ');


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
		if (ts < value) { min = guess + 1; } else
		if (ts > array[guess + 1]) { return guess; } else { max = guess - 1; }

	}
	return array.length > 0 ? array.length : 0;
}

export const insert = (array, el) => (array.splice(sort(array, el.ts), 0, el), array);
