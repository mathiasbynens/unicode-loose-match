'use strict';

const mappings = require('./data/mappings.js');
const aliasToProperty = mappings.aliasToProperty;
const propertyToValueAliases = mappings.propertyToValueAliases;

const normalize = function(string) {
	const normalized = string
		// Remove case distinctions.
		.toLowerCase()
		// Remove whitespace.
		.replace(/\s/g, '')
		// Remove `-` and `_`.
		.replace(/[-_]/g, '');
	return normalized;
};

const matchLoosely = function(property, value) {
	const normalizedProperty = normalize(property);
	const canonicalProperty = aliasToProperty.get(normalizedProperty);
	if (!canonicalProperty) {
		throw new Error(`Unknown property: ${ property }`);
	}
	const aliasToValue = propertyToValueAliases.get(canonicalProperty);
	const result = {
		'property': canonicalProperty
	};
	if (value) {
		const normalizedValue = normalize(value);
		const canonicalValue = aliasToValue.get(normalizedValue);
		if (canonicalValue) {
			result.value = canonicalValue;
		}
	}
	return result;
};

module.exports = matchLoosely;
