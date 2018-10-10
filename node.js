const { URL, URLSearchParams } = require('url')
const fetch = require('node-fetch')
module.exports = require('./xfetch').extend({
	fetch,
	URL,
	URLSearchParams,
	Headers: fetch.Headers
})
