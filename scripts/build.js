'use strict';

const binaryProperties = require('unicode-11.0.0').Binary_Property;
const propertyAliases = require('unicode-property-aliases');
const valueAliases = require('unicode-property-value-aliases');
const jsesc = require('jsesc');

const normalize = function(string) {
	const normalized = string
		// Remove case distinctions.
		.toLowerCase()
		// Remove whitespace.
		.replace(/\s/g, '')
		// Remove `-` and `_`.
		.replace(/[-_]/g, '');
	// Note: don’t remove `is` prefixes, since that would mangle
	// `isc`/`ISO_Comment`.
	return normalized;
};

const aliasToProperty = new Map();
const propertyToValueAliases = new Map();
for (const [propertyAlias, canonicalProperty] of propertyAliases.entries()) {
	// Map the normalized version of this property alias to the canonical
	// property name.
	const normalizedPropertyAlias = normalize(propertyAlias);
	aliasToProperty.set(normalizedPropertyAlias, canonicalProperty);
	// Map the normalized version of the canonical property name to the canonical
	// property name.
	const normalizedCanonicalProperty = normalize(canonicalProperty);
	aliasToProperty.set(normalizedCanonicalProperty, canonicalProperty);
	// Handle the property value aliases for this property.
	const valueAliasMappings = valueAliases.get(canonicalProperty);
	// { property value alias => canonical property value }
	const aliasToValue = new Map();
	if (valueAliasMappings) {
		for (const [valueAlias, canonicalValue] of valueAliasMappings.entries()) {
			const normalizedValueAlias = normalize(valueAlias);
			aliasToValue.set(normalizedValueAlias, canonicalValue);
			const normalizedCanonicalValue = normalize(canonicalValue);
			aliasToValue.set(normalizedCanonicalValue, canonicalValue);
		}
	}
	// { canonical property => { property value alias => canonical property value } }
	if (aliasToValue.size) {
		propertyToValueAliases.set(canonicalProperty, aliasToValue);
	} else {
		console.log(`No property value aliases for ${ canonicalProperty }`);
	}
}

// Add normalized “aliases” for binary properties.
for (const property of binaryProperties) {
	const normalizedProperty = normalize(property);
	aliasToProperty.set(normalizedProperty, property);
}

const object = {
	aliasToProperty,
	propertyToValueAliases
};
const output = `module.exports = ${ jsesc(object, { 'compact': false }) };\n`;
require('fs').writeFileSync('data/mappings.js', output);
