# unicode-loose-match [![Build status](https://travis-ci.org/mathiasbynens/unicode-loose-match.svg?branch=master)](https://travis-ci.org/mathiasbynens/unicode-loose-match)

unicode-loose-match is a JavaScript implementation of [UAX44-LM3](http://unicode.org/reports/tr44/tr44-16.html#Matching_Symbolic), i.e. the loose matching algorithm for symbolic values as defined in the Unicode Standard.

It’s based on [the data for Unicode v8.0.0](https://github.com/mathiasbynens/unicode-8.0.0).

## Installation

To use _unicode-loose-match_ programmatically, install it as a dependency via [npm](https://www.npmjs.com/):

```bash
$ npm install unicode-loose-match
```

Then, `require` it:

```js
const matchLoosely = require('unicode-loose-match');
```

## API

This module exports a single function named `matchLoosely`.

### `matchLoosely(type, input)`

This function takes a string `input` and applies loose matching on it within the list of all Unicode property values of type `type`.

`type` must be one of `'blocks'`, `'categories'`, `'properties'`, or `'scripts'`.

The return value is a string containing the canonical match if one is found, and `false` otherwise.

```js
matchLoosely('scripts', 'CaNaDiAn-aBOrI_gIn AL');
// → 'Canadian_Aboriginal'
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_unicode-loose-match_ is available under the [MIT](https://mths.be/mit) license.
