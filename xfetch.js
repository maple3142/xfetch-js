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
	const genqs=o=>new URLSearchParams(o).toString()
	const create = fetch => {
		const xfetch = (input, init = {}) => {
			if (!init.headers) {
				init.headers = {}
			}
			if (init.json) {
				init.body = JSON.stringify(init.json)
				init.headers['Content-Type'] = 'application/json'
			} else if (init.form) {
				init.body = genqs(init.form)
				init.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			}
			if (init.qs) {
				input += '?' + genqs(init.qs)
			}
			if (!init.credentials) {
				init.credentials = 'same-origin'
			}
			const p = fetch(input, init).then(r => {
				if (r.ok) return r
				throw new Error(r.status)
			})
			for (const alias of ALIASES) {
				p[alias] = () => p.then(r => r[alias]())
			}
			return p
		}
		for (const method of METHODS) {
			xfetch[method] = (input, init = {}) => {
				init.method = method
				return xfetch(input, init)
			}
		}
		return xfetch
	}
	const xfetch = create(typeof fetch === 'undefined' ? null : fetch)
	xfetch.create = create
	return xfetch
})
