import test from 'ava'
import xfetch from '../xfetch'
import fetch from 'node-fetch'

const xf = xfetch.createXFetch(fetch)

test('get', async t => {
	const { headers } = await xf('https://postman-echo.com/get/').json()
	t.is(headers.host, 'postman-echo.com')
})
test('get with qs', async t => {
	const { args } = await xf.get('https://postman-echo.com/get', { qs: { foo: 'bar' } }).json()
	t.deepEqual(args, { foo: 'bar' })
})
test('post json', async t => {
	const { data } = await xf.post('https://postman-echo.com/post', { json: { foo: 'bar' } }).json()
	t.deepEqual(data, { foo: 'bar' })
})
test('post form', async t => {
	const { form } = await xf.post('https://postman-echo.com/post', { form: { foo: 'bar' } }).json()
	t.deepEqual(form, { foo: 'bar' })
})
