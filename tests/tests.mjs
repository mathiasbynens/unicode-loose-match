import assert from 'node:assert/strict';
import test from 'node:test';
import matchLoosely from '../index.mjs';

test('unicode-loose-match', () => {
	assert.deepEqual(
		matchLoosely('blk', 'latin_extended_a'),
		{ 'property': 'Block', 'value': 'Latin_Extended_A' }
	);
	assert.deepEqual(
		matchLoosely('block', 'Arabic_PF_B'),
		{ 'property': 'Block', 'value': 'Arabic_Presentation_Forms_B' }
	);
	assert.deepEqual(
		matchLoosely('block', 'arabic p-fb'),
		{ 'property': 'Block', 'value': 'Arabic_Presentation_Forms_B' }
	);
	assert.deepEqual(
		matchLoosely('block', 'unknown value'),
		{ 'property': 'Block' }
	);
	assert.deepEqual(
		matchLoosely('gc', 'L'),
		{ 'property': 'General_Category', 'value': 'Letter' }
	);
	assert.deepEqual(
		matchLoosely('gc', 'Lu'),
		{ 'property': 'General_Category', 'value': 'Uppercase_Letter' }
	);
	assert.deepEqual(
		matchLoosely('sc', 'greek'),
		{ 'property': 'Script', 'value': 'Greek' }
	);
	assert.deepEqual(
		matchLoosely('scx', 'greek'),
		{ 'property': 'Script_Extensions', 'value': 'Greek' }
	);
	assert.deepEqual(
		matchLoosely('sc', 'Xpeo'),
		{ 'property': 'Script', 'value': 'Old_Persian' }
	);
	assert.deepEqual(
		matchLoosely('scx', 'Xpeo'),
		{ 'property': 'Script_Extensions', 'value': 'Old_Persian' }
	);
	assert.deepEqual(
		matchLoosely('isc'),
		{ 'property': 'ISO_Comment' }
	);
	assert.deepEqual(
		matchLoosely('ce'),
		{ 'property': 'Composition_Exclusion' }
	);
	assert.deepEqual(
		matchLoosely('compositionexclusion'),
		{ 'property': 'Composition_Exclusion' }
	);
	assert.deepEqual(
		matchLoosely('bidimirrored'),
		{ 'property': 'Bidi_Mirrored' }
	);
	assert.deepEqual(
		matchLoosely('bidim'),
		{ 'property': 'Bidi_Mirrored' }
	);
	assert.deepEqual(
		matchLoosely('compex'),
		{ 'property': 'Full_Composition_Exclusion' }
	);
	assert.throws(
		() => matchLoosely('unknown property', 'unknown value'),
		Error
	);
});

