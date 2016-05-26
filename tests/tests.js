import test from 'ava';
import matchLoosely from '../index.js';

test(t => {
	t.deepEqual(
		matchLoosely('blk', 'latin_extended_a'),
		{ 'property': 'Block', 'value': 'Latin_Extended-A' }
	);
	t.deepEqual(
		matchLoosely('block', 'Arabic_PF_B'),
		{ 'property': 'Block', 'value': 'Arabic_Presentation_Forms_B' }
	);
	t.deepEqual(
		matchLoosely('block', 'arabic p-fb'),
		{ 'property': 'Block', 'value': 'Arabic_Presentation_Forms_B' }
	);
	t.deepEqual(
		matchLoosely('block', 'unknown value'),
		{ 'property': 'Block' }
	);
	t.deepEqual(
		matchLoosely('gc', 'L'),
		{ 'property': 'General_Category', 'value': 'Letter' }
	);
	t.deepEqual(
		matchLoosely('gc', 'Lu'),
		{ 'property': 'General_Category', 'value': 'Uppercase_Letter' }
	);
	t.deepEqual(
		matchLoosely('sc', 'greek'),
		{ 'property': 'Script', 'value': 'Greek' }
	);
	t.deepEqual(
		matchLoosely('scx', 'greek'),
		{ 'property': 'Script_Extensions', 'value': 'Greek' }
	);
	t.deepEqual(
		matchLoosely('sc', 'Xpeo'),
		{ 'property': 'Script', 'value': 'Old_Persian' }
	);
	t.deepEqual(
		matchLoosely('scx', 'Xpeo'),
		{ 'property': 'Script_Extensions', 'value': 'Old_Persian' }
	);
	t.deepEqual(
		matchLoosely('isc'),
		{ 'property': 'ISO_Comment' }
	);
	t.deepEqual(
		matchLoosely('ce'),
		{ 'property': 'Composition_Exclusion' }
	);
	t.deepEqual(
		matchLoosely('compositionexclusion'),
		{ 'property': 'Composition_Exclusion' }
	);
	t.deepEqual(
		matchLoosely('bidimirrored'),
		{ 'property': 'Bidi_Mirrored' }
	);
	t.deepEqual(
		matchLoosely('bidim'),
		{ 'property': 'Bidi_Mirrored' }
	);
	t.deepEqual(
		matchLoosely('compex'),
		{ 'property': 'Full_Composition_Exclusion' }
	);
	t.throws(
		() => matchLoosely('unknown property', 'unknown value'),
		Error
	);
});
