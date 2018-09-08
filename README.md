# XFetch.js

> A extremely simple fetch extension inspired by [sindresorhus/ky](https://github.com/sindresorhus/ky).

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
const xf = require('xfetch-js').createXFetch(require('node-fetch'))

xf('https://postman-echo.com/get/', { qs: { foo: 'bar' } })
  .json()
  .then(console.log)
```