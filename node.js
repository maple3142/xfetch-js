const url = require('url')
global.URL = url.URL
global.URLSearchParams = url.URLSearchParams

module.exports = require('./xfetch').create(require('node-fetch'))
