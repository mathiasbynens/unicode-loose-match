# unicode-loose-match [![unicode-loose-match on npm](https://img.shields.io/npm/v/unicode-loose-match)](https://www.npmjs.com/package/unicode-loose-match)

unicode-loose-match is a JavaScript implementation of [UAX44-LM3](http://unicode.org/reports/tr44/tr44-16.html#Matching_Symbolic), i.e. the loose matching algorithm for symbolic values as defined in the Unicode Standard.

It’s based on Unicode data and recognizes [property aliases](https://github.com/mathiasbynens/unicode-property-aliases) and [property value aliases](https://github.com/mathiasbynens/unicode-property-value-aliases).

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

### `matchLoosely(propertyInput, [valueInput])`

This function takes two strings `propertyInput` and `valueInput` and applies loose matching on the property-value pair within the list of all Unicode property values. `valueInput` is optional.

The return value is an object containing containing the canonical property name `property` and the canonical property value name `value`. If an unknown `propertyInput` is given, an exception is thrown.

```js
// Find the canonical property name and property value name:
matchLoosely('blk', 'Arabic_PF_B');
// → { 'property': 'Block', 'value': 'Arabic_Presentation_Forms_B' }

// Find the canonical property name:
matchLoosely('compex');
// → { 'property': 'Full_Composition_Exclusion' }
```

## For maintainers

### How to publish a new release

1. On the `main` branch, bump the version number in `package.json`:

   ```sh
   npm version patch -m 'Release v%s'
   ```

   Instead of `patch`, use `minor` or `major` [as needed](https://semver.org/).

   Note that this produces a Git commit + tag.

1. Push the release commit and tag:

   ```sh
   git push && git push --tags
   ```

   Our CI then automatically publishes the new release to npm.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias 'Follow @mathias on Twitter') |
| ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mathias Bynens](https://mathiasbynens.be/)                                                                                                       |

## License

_unicode-loose-match_ is available under the [MIT](https://mths.be/mit) license.
