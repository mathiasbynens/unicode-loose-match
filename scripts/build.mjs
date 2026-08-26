import { writeFile } from 'node:fs/promises';
import unicode from '@unicode/unicode-17.0.0';
import propertyAliases from 'unicode-property-aliases';
import valueAliases from 'unicode-property-value-aliases';
import jsesc from 'jsesc';

const binaryProperties = unicode.Binary_Property;

const sortMapByKey = (map) => {
	return new Map(
		Array.from(map).sort((a, b) => {
			return a[0].localeCompare(b[0], 'en');
		}),
	);
};

const normalize = (string) => {
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
	// Map property value alias to canonical property value.
	const aliasToValue = new Map();
	if (valueAliasMappings) {
		for (const [valueAlias, canonicalValue] of valueAliasMappings.entries()) {
			const normalizedValueAlias = normalize(valueAlias);
			aliasToValue.set(normalizedValueAlias, canonicalValue);
			const normalizedCanonicalValue = normalize(canonicalValue);
			aliasToValue.set(normalizedCanonicalValue, canonicalValue);
		}
	}
	// Map canonical property to property value alias mappings.
	if (aliasToValue.size) {
		propertyToValueAliases.set(canonicalProperty, sortMapByKey(aliasToValue));
	} else {
		console.log(`No property value aliases for ${canonicalProperty}.`);
	}
}

// Add normalized “aliases” for binary properties.
for (const property of binaryProperties) {
	const normalizedProperty = normalize(property);
	aliasToProperty.set(normalizedProperty, property);
}

const header = '// Generated using `npm run build`. Do not edit!\n';
const output = `${header}export const aliasToProperty = ${jsesc(sortMapByKey(aliasToProperty), { compact: false })};\n\nexport const propertyToValueAliases = ${jsesc(sortMapByKey(propertyToValueAliases), { compact: false })};\n`;
await writeFile('data/mappings.mjs', output);
