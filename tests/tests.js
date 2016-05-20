import test from 'ava';
import matchLoosely from '../index.js';

test(async t => {
	t.is(
		matchLoosely('blocks', 'is_latin_extended_a'),
		'Latin Extended-A'
	);
	t.is(
		matchLoosely('blocks', 'latin69supplement'),
		false
	);
	t.is(
		matchLoosely('categories', 'zs'),
		'Zs'
	);
	t.is(
		matchLoosely('categories', 'xx'),
		false
	);
	t.is(
		matchLoosely('properties', 'other idcontinue'),
		'Other_ID_Continue'
	);
	t.is(
		matchLoosely('properties', 'Other_ID_Lolwat'),
		false
	);
	t.is(
		matchLoosely('scripts', 'CaNaDiAn-aBOrI_gIn AL'),
		'Canadian_Aboriginal'
	);
	t.is(
		matchLoosely('scripts', 'Icelandic-aBOrI_gIn AL'),
		false
	);
	t.throws(
		() => matchLoosely('yolo', 'ASCII'),
		Error
	);
});
