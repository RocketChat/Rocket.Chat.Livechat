const UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

const fraction = () => {
	const array = new Uint32Array(1);
	window.crypto.getRandomValues(array);
	return array[0] * 2.3283064365386963e-10;
};

export const chooseElement = (arrayOrString) => {
	const index = Math.floor(fraction() * arrayOrString.length);

	if (typeof arrayOrString === 'string') {
		return arrayOrString.substr(index, 1);
	}

	return arrayOrString[index];
};

export const createRandomString = (charsCount, alphabet) =>
	Array.from({ length: charsCount }, () => chooseElement(alphabet)).join('');

export const createRandomId = (charsCount = 17) =>
	createRandomString(charsCount, UNMISTAKABLE_CHARS);
