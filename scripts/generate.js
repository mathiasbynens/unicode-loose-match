'use strict';

const unicode = require('unicode-8.0.0');
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
	// Add normalized “aliases” for known blocks.
	if (canonicalProperty == 'Block') {
		for (const block of unicode.blocks) {
			const normalizedBlock = normalize(block);
			aliasToValue.set(normalizedBlock, block);
		}
	}
	// Add normalized “aliases” for known categories.
	if (canonicalProperty == 'General_Category') {
		for (const category of unicode.categories) {
			const normalizedCategory = normalize(category);
			aliasToValue.set(normalizedCategory, category);
		}
	}
	// Add normalized “aliases” for known scripts.
	if (canonicalProperty == 'Script') {
		for (const script of unicode.scripts) {
			const normalizedScript = normalize(script);
			aliasToValue.set(normalizedScript, script);
		}
	}
	// Add normalized “aliases” for known script extensions.
	if (canonicalProperty == 'Script_Extensions') {
		for (const script of unicode['script-extensions']) {
			const normalizedScript = normalize(script);
			aliasToValue.set(normalizedScript, script);
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
for (const property of unicode.properties) {
	const normalizedProperty = normalize(property);
	aliasToProperty.set(normalizedProperty, property);
}

const object = {
	aliasToProperty,
	propertyToValueAliases
};
const output = `module.exports = ${ jsesc(object, { 'compact': false }) };\n`;
require('fs').writeFileSync('data/mappings.js', output);
