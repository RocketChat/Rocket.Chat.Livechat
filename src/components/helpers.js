export const createClassName = (styles, elementName, modifiers = {}) => [
	styles[elementName],
	...(Object.entries(modifiers)
		.flatMap(([modifierKey, modifierValue]) => [
			modifierValue && styles[`${ elementName }--${ modifierKey }`],
			typeof modifierValue !== 'boolean' && styles[`${ elementName }--${ modifierKey }-${ modifierValue }`],
		])
		.filter((className) => !!className)),
].join(' ');
