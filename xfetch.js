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
	class HTTPError extends Error {
		constructor(res) {
			super(res.statusText)
			this.name = 'HTTPError'
			this.response = res
		}
	}
	const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head']
	const ALIASES = ['arrayBuffer', 'blob', 'formData', 'json', 'text']
	const genqs = o => new URLSearchParams(o).toString()
	const create = (fetch, defaultInit = {}) => {
		const xfetch = (input, init = {}) => {
			Object.assign(init, defaultInit)
			const url = new URL(input, init.baseURI || undefined)
			if (!init.headers) {
				init.headers = {}
			}
			// Add json or form on body
			if (init.json) {
				init.body = JSON.stringify(init.json)
				init.headers['Content-Type'] = 'application/json'
			} else if (init.form) {
				init.body = genqs(init.form)
				init.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			}
			// Querystring
			if (init.qs) {
				url.search = genqs(init.qs)
			}
			// same-origin by default
			if (!init.credentials) {
				init.credentials = 'same-origin'
			}
			const promise = fetch(url, init).then(res => {
				if (!res.ok) throw new HTTPError(res)
				return res
			})
			for (const alias of ALIASES) {
				// if transformation function is provided, pass it for transform
				promise[alias] = fn => promise.then(res => res[alias]()).then(fn || (x => x))
			}
			return promise
		}
		for (const method of METHODS) {
			xfetch[method] = (input, init = {}) => {
				init.method = method
				return xfetch(input, init)
			}
		}
		// Extra methods and classes
		xfetch.create = create
		xfetch.extend = defaultInit => create(fetch, defaultInit)
		xfetch.HTTPError = HTTPError
		return xfetch
	}
	const xfetch = create(typeof fetch === 'undefined' ? null : fetch, {
		baseURI: typeof document === 'undefined' ? undefined : document.baseURI
	})
	return xfetch
})
