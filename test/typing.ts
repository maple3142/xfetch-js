declare const expect: <T>(value: T) => void
import xf = require('../xfetch')
import { XFetch, XResponsePromise, HTTPError } from '../xfetch.base'

expect<XResponsePromise>(xf.get(''))
expect<Promise<string>>(xf.get('').text())
expect<XFetch>(xf.extend({ fetch, URL, Request }))
expect<XFetch>(xf.extend({}))
expect<Promise<number>>(xf.get('').json(() => 1))
expect<Promise<HTTPError>>(xf.get('').catch(e => e))
expect<Promise<string>>(
	xf
		.get('', {
			qs: '',
			json: {}
		})
		.text()
)
expect<Promise<null>>(
	xf
		.get('', {
			qs: {},
			form: {}
		})
		.blob(() => null)
)
