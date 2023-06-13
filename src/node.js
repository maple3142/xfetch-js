module.exports = require('./xfetch').extend({
	fetch: typeof fetch === 'undefined' ? require('node-fetch-commonjs') : fetch,
	URL: typeof URL === 'undefined' ? require('url').URL : URL,
	URLSearchParams: typeof URLSearchParams === 'undefined' ? require('url').URLSearchParams : URLSearchParams,
	FormData: typeof FormData === 'undefined' ? require('form-data') : FormData,
	Headers: typeof Headers === 'undefined' ? require('node-fetch-commonjs').Headers : Headers
})
