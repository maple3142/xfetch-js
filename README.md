# xfetch-js

> A extremely simple fetch extension for modern browsers inspired by [sindresorhus/ky](https://github.com/sindresorhus/ky).
>
> Which aims to be as small as possible and easy to use.

[![Build Status](https://img.shields.io/travis/maple3142/xfetch-js.svg?style=flat-square)](https://travis-ci.org/maple3142/xfetch-js)
[![npm](https://img.shields.io/npm/v/xfetch-js.svg?style=flat-square)](https://www.npmjs.com/package/xfetch-js)

## Examaple

```js
// get with query string
xf('https://postman-echo.com/get/', { qs: { foo: 'bar' } })
  .json()
  .then(console.log)

// post form
xf.post('https://postman-echo.com/post', { form: { foo: 'bar' } })
  .json()
  .then(console.log)

// post json
xf.post('https://postman-echo.com/post', { json: { foo: 'bar' } })
  .json()
  .then(console.log)
```

## With node

```js
const xf = require('xfetch-js').create(require('node-fetch'))

xf('https://postman-echo.com/get/', { qs: { foo: 'bar' } })
  .json()
  .then(console.log)
```

### Node version must be greater than 10

Otherwise, you will get an error about `global.URL`,`global.URLSearchParams` is undefined.

Of course, you can polyfill them by youself to use this module.

## Main differences bewteen fetch and XFetch.js

* `credentials` is set to `same-origin` by default.
* throws error when `response.ok` is not true
* Some useful methods to call, such as `get`,`post` and so on...
* Support some simple serialization, including `json`,`urlencoded` and `querystring`
