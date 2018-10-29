/*
 * XFetch.js
 * A extremely simple fetch extension inspired by sindresorhus/ky.
 */
;((root, fn) => {
	if (typeof define === 'function' && define.amd) {
		define([], fn)
	} else if (typeof exports === 'object') {
		module.exports = fn()
	} else {
		root.xf = fn()
	}
})(this, () => {
	const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head']
	class HTTPError extends Error {
		constructor(res) {
			super(res.statusText)
			this.name = 'HTTPError'
			this.response = res
		}
	}
	class XResponsePromise extends Promise {}
	for (const alias of ['arrayBuffer', 'blob', 'formData', 'json', 'text']) {
		// alias for .json() .text() etc...
		XResponsePromise.prototype[alias] = function(fn) {
			return this.then(res => res[alias]()).then(fn || (x => x))
		}
	}
	const { assign } = Object
	const fromEntries = ent => ent.reduce((acc, [k, v]) => ((acc[k] = v), acc), {})
	const responseErrorThrower = res => {
		if (!res.ok) throw new HTTPError(res)
		return res
	}
	const extend = (defaultInit = {}) => {
		const xfetch = (input, init = {}) => {
			assign(init, defaultInit)
			const createQueryString = o => new init.URLSearchParams(o).toString()
			const parseQueryString = s => fromEntries([...new init.URLSearchParams(s).entries()])
			const url = new init.URL(input, init.baseURI || undefined)
			if (!init.headers) {
				init.headers = {}
			} else if (init.headers instanceof init.Headers) {
				// Transform into object if it is object
				init.headers = fromEntries([...init.headers.entries()])
			}
			// Add json or form on body
			if (init.json) {
				init.body = JSON.stringify(init.json)
				init.headers['Content-Type'] = 'application/json'
			} else if (init.form) {
				init.body = createQueryString(init.form)
				init.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			}
			// Querystring
			if (init.qs) {
				if (typeof init.qs === 'string') init.qs = parseQueryString(init.qs)
				url.search = createQueryString(assign(fromEntries([...url.searchParams.entries()]), init.qs))
			}
			// same-origin by default
			if (!init.credentials) {
				init.credentials = 'same-origin'
			}
			return XResponsePromise.resolve(init.fetch(url, init).then(responseErrorThrower))
		}
		for (const method of METHODS) {
			xfetch[method] = (input, init = {}) => {
				init.method = method
				return xfetch(input, init)
			}
		}
		// Extra methods and classes
		xfetch.extend = newDefaultInit => extend(assign({}, defaultInit, newDefaultInit))
		xfetch.HTTPError = HTTPError
		return xfetch
	}
	const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
	return isBrowser
		? extend({ fetch: fetch.bind(window), URL, Response, URLSearchParams, Headers, baseURI: document.baseURI })
		: extend()
})
