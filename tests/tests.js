import test from 'ava';
import matchLoosely from '../index.js';

test(t => {
	t.deepEqual(
		matchLoosely('blk', 'latin_extended_a'),
		{ 'property': 'Block', 'value': 'Latin Extended-A' }
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
		matchLoosely('scx', 'greek'),
		{ 'property': 'Script_Extensions', 'value': 'Greek' }
	);
	t.deepEqual(
		matchLoosely('isc'),
		{ 'property': 'ISO_Comment' }
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
