const { URL } = require('url')
const fetch = require('node-fetch')
module.exports = require('./xfetch').extend({
	fetch,
	URL,
	Headers: fetch.Headers
})
