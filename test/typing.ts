declare const expect: <T>(value: T) => void // type assertion helper
import xf = require('../xfetch')
import { XFetch, XPromise, HTTPError } from '../xfetch.base'

expect<XPromise<Response>>(xf.get(''))
expect<XPromise<string>>(xf.get('').text())
expect<XFetch>(xf.extend({ fetch, URL, Headers }))
expect<XFetch>(xf.extend({}))
expect<XPromise<number>>(xf.get('').json(() => 1))
// expect<XPromise<Response>>(xf.get('').text(()=>xf.get('')))) // this one should work, but ts doesn't support it in custom Promise
expect<Promise<HTTPError>>(xf.get('').catch(e => e))
expect<XPromise<string>>(
	xf
		.get('', {
			qs: '',
			json: {}
		})
		.text()
)
expect<XPromise<Response>>(xf.get('', { headers: new Headers() }))
