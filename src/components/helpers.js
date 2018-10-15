<<<<<<< HEAD
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

<<<<<<< HEAD
export const createClassName = (styles, elementName, modifiers = {}) => [
=======
export const createClassName = (styles, elementName, modifiers = {}, classes = []) => [
>>>>>>> origin/master
=======
export const createClassName = (styles, elementName, modifiers = {}, classes = []) => [
>>>>>>> master
	styles[elementName],
	...(flatMap(Object.entries(modifiers), ([modifierKey, modifierValue]) => [
		modifierValue && styles[`${ elementName }--${ modifierKey }`],
		typeof modifierValue !== 'boolean' && styles[`${ elementName }--${ modifierKey }-${ modifierValue }`],
	])
<<<<<<< HEAD
		.filter((className) => !!className)),
<<<<<<< HEAD
].join(' ');
=======
		.filter((className) => !!className)), ...classes].join(' ');
>>>>>>> origin/master

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
=======
	...classes].join(' ');
>>>>>>> master
