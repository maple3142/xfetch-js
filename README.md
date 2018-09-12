# xfetch-js

> A extremely simple fetch extension for modern browsers inspired by [sindresorhus/ky](https://github.com/sindresorhus/ky).
>
> Which aims to be as small as possible and easy to use.

[![Build Status](https://img.shields.io/travis/maple3142/xfetch-js.svg?style=flat-square)](https://travis-ci.org/maple3142/xfetch-js)
[![npm](https://img.shields.io/npm/v/xfetch-js.svg?style=flat-square)](https://www.npmjs.com/package/xfetch-js)
[![Type definition](https://img.shields.io/npm/types/xfetch-js.svg?style=flat-square)](https://github.com/maple3142/xfetch-js/blob/master/xfetch.base.d.ts)

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

// post json with transforms
xf.post('https://postman-echo.com/post', { json: { foo: 'bar' } })
  .json(r => r.data)
  .then(console.log)

// extend, default baseURI in browser is document.baseURI
const xf2 = xf.extend({
  baseURI: 'https://postman-echo.com/'
})
xf2.get('/get').then(console.log)

// HTTPError
xf.get('https://postman-echo.com/404').catch(e => {
  assert(e instanceof xf.HTTPError)
  console.log(e.response)
})
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

## Main differences bewteen fetch and xfetch-js

- `credentials` is set to `same-origin` by default.
- Throws error when `response.ok` is not true
- Some useful methods to call, such as `get`,`post` and so on...
- Support some simple serialization, including `json`,`urlencoded` and `querystring`
- Support post transformation like `.json(r => r.body)`
- Create another instance with default options `xf.extend({})`

## API

See [xfetch.base.d.ts](https://github.com/maple3142/xfetch-js/blob/master/xfetch.base.d.ts).

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmaple3142%2Fxfetch-js.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmaple3142%2Fxfetch-js?ref=badge_large)
