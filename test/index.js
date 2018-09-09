import test from 'ava'
import xfetch from '../xfetch'
import fetch from 'node-fetch'

const xf = xfetch.create(fetch)

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
test('base', async t => {
	const xf2 = xf.base('https://postman-echo.com/')
	const { url } = await xf2.get('/get').json()
	t.is(url, 'https://postman-echo.com/get')
})
test('transforms', async t => {
	const headers = await xf.get('https://postman-echo.com/get/').json(r => r.headers)
	t.is(headers.host, 'postman-echo.com')
})
test('HTTPError', async t => {
	await t.throwsAsync(xf.get('http://postman-echo.com/404'), {
		instanceOf: xf.HTTPError
	})
})
