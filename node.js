const { URL, URLSearchParams } = require('url')
const fetch = require('node-fetch')
const FormData = require('form-data')
module.exports = require('./xfetch').extend({
	fetch,
	URL,
	URLSearchParams,
	FormData,
	Headers: fetch.Headers
})
