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
	const ALIASES = ['arrayBuffer', 'blob', 'formData', 'json', 'text']
	class HTTPError extends Error {
		constructor(res) {
			super(res.statusText)
			this.name = 'HTTPError'
			this.response = res
		}
	}
	class XResponsePromise extends Promise {}
	for (const alias of ALIASES) {
		// alias for .json() .text() etc...
		XResponsePromise.prototype[alias] = function(fn) {
			return this.then(res => res[alias]()).then(fn || (x => x))
		}
	}
	const searchParamsToObject = sp => [...sp.entries()].reduce((o, [k, v]) => ((o[k] = v), o), {})
	const createQueryString = o => new URLSearchParams(o).toString()
	const parseQueryString = s => searchParamsToObject(new URLSearchParams(s))
	const extend = (defaultInit = {}) => {
		const xfetch = (input, init = {}) => {
			Object.assign(init, defaultInit)
			const url = new init.URL(input, init.baseURI || undefined)
			if (!init.headers) {
				init.headers = {}
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
				url.search = createQueryString(Object.assign(searchParamsToObject(url.searchParams), init.qs))
			}
			// same-origin by default
			if (!init.credentials) {
				init.credentials = 'same-origin'
			}
			const promise = XResponsePromise.resolve(
				init.fetch(url, init).then(res => {
					if (!res.ok) throw new HTTPError(res)
					return res
				})
			)
			return promise
		}
		for (const method of METHODS) {
			xfetch[method] = (input, init = {}) => {
				init.method = method
				return xfetch(input, init)
			}
		}
		// Extra methods and classes
		xfetch.extend = newDefaultInit => extend(Object.assign({}, defaultInit, newDefaultInit))
		xfetch.HTTPError = HTTPError
		return xfetch
	}
	const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
	return isBrowser ? extend({ fetch, URL, Request, baseURI: document.baseURI }) : extend()
})
