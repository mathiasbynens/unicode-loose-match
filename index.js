'use strict';

const MAPS = require('./data/maps.js');

const matchLoosely = function(type, input) {
	const stripped = input
		// Remove case distinctions.
		.toLowerCase()
		// Remove whitespace.
		.replace(/\s/g, '')
		// Remove `-` and `_`.
		.replace(/[-_]/g, '')
		// Remove `is` prefix.
		.replace(/^is/g, '');
	const map = MAPS[type];
	if (!map) {
		throw new Error(`Invalid type: ${type}`);
	}
	const match = map.get(stripped);
	return match || false;
};

module.exports = matchLoosely;
