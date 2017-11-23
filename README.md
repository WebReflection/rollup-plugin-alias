# rollup-plugin-cdn

[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate)
[![Coverage Status](https://coveralls.io/repos/github/WebReflection/rollup-plugin-cdn/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/rollup-plugin-cdn?branch=master)
[![Build Status](https://travis-ci.org/WebReflection/rollup-plugin-cdn.svg?branch=master)](https://travis-ci.org/WebReflection/rollup-plugin-cdn)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Resolve locally all dependencies loaded through fully qualified CDN urls.


### Supported CDNs

So far the only supported CDN is [unpkg.com](https://unpkg.com/#/).
You are welcome to PR others too.


### Example

If your module has [hyperHTML](https://github.com/WebReflection/hyperHTML) as dependency,
and you have installed it locally,
you can import it as fully qualified ESM module.

The remote url will be resolved through the locally installed dependency.

```js
import hyper from 'https://unpkg.com/hyperhtml@latest/esm/index.js';

hyper(document.body)`
  <h1>Hello ESM</h1>`;
```

This enables your modules to be natively testable/usable as ESM in browsers, but also easily bundled for production.


### Installation
```
$ npm install rollup-plugin-cdn
```


### Usage
```javascript
// rollup.config.js
import cdn from 'rollup-plugin-cdn';

export default {
  input: './esm/index.js',
  plugins: [cdn()],
};
```


### License
ISC, see `LICENSE` for more information.
