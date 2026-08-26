import { aliasToProperty, propertyToValueAliases } from './data/mappings.mjs';

const normalize = (string) => {
	const normalized = string
		// Remove case distinctions.
		.toLowerCase()
		// Remove whitespace.
		.replace(/\s/g, '')
		// Remove `-` and `_`.
		.replace(/[-_]/g, '');
	return normalized;
};

const matchLoosely = (property, value) => {
	const normalizedProperty = normalize(property);
	const canonicalProperty = aliasToProperty.get(normalizedProperty);
	if (!canonicalProperty) {
		throw new Error(`Unknown property: ${ property }`);
	}
	const aliasToValue = propertyToValueAliases.get(
		canonicalProperty == 'Script_Extensions' ? 'Script' : canonicalProperty
	);
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

export default matchLoosely;

