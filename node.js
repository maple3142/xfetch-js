const url=require('url')
global.URL=url.URL
global.URLSearchParams=url.URLSearchParams

module.exports=require('./').create(require('node-fetch'))
