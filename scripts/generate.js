'use strict';

const unicode = require('unicode-8.0.0');
const jsesc = require('jsesc');

const propertyNames = [
	'blocks',
	'categories',
	'properties',
	'scripts'
];

const output = 'module.exports = {\n' + propertyNames.map(propertyName => {
	const CACHE = new Map();
	const propertyValues = unicode[propertyName];
	for (const propertyValue of propertyValues) {
		const stripped = propertyValue
			// Remove case distinctions.
			.toLowerCase()
			// Remove whitespace.
			.replace(/\s/g, '')
			// Remove `-` and `_`.
			.replace(/[-_]/g, '')
			// Remove `is` prefix.
			.replace(/^is/g, '');
		// Map the stripped name to the canonical name.
		console.assert(!CACHE.has(stripped));
		CACHE.set(stripped, propertyValue);
	}
	return `\t${ jsesc(propertyName, { 'wrap': true }) }: new Map(${ jsesc([...CACHE]) })`;
}).join(',\n') + '\n};\n';

require('fs').writeFileSync('data/maps.js', output);
