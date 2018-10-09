const { URL } = require('url')
const fetch = require('node-fetch')
module.exports = require('./xfetch').extend({
	fetch,
	URL,
	Request: fetch.Request
})
