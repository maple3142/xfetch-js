import test from 'ava'
import xf from '../node'

const client = xf.extend({
	baseURI: 'https://postman-echo.com/'
})

test('get', async t => {
	const { headers } = await client('/get').json()
	t.is(headers.host, 'postman-echo.com')
})
test('get with qs', async t => {
	const { args } = await client.get('/get', { qs: { foo: 'bar' } }).json()
	t.deepEqual(args, { foo: 'bar' })
})
test('get with string qs', async t => {
	const { args } = await client.get('/get', { qs: 'foo=bar' }).json()
	t.deepEqual(args, { foo: 'bar' })
})
test('post json', async t => {
	const { data } = await client.post('/post', { json: { foo: 'bar' } }).json()
	t.deepEqual(data, { foo: 'bar' })
})
test('post form', async t => {
	const { form } = await client.post('/post', { form: { foo: 'bar' } }).json()
	t.deepEqual(form, { foo: 'bar' })
})
test('merge qs', async t => {
	const { args } = await client.get('/get?a=b', { qs: { foo: 'bar' } }).json()
	t.deepEqual(args, { foo: 'bar', a: 'b' })
})
test('extend', async t => {
	const xf2 = xf.extend({
		baseURI: 'https://postman-echo.com/'
	})
	const { url } = await xf2.get('/get').json()
	t.is(url, 'https://postman-echo.com/get')
})
test('transforms', async t => {
	const headers = await client.get('/get').json(r => r.headers)
	t.is(headers.host, 'postman-echo.com')
})
test('promise chaining', async t => {
	const { data } = await client
		.get('/get')
		.json(({ headers }) => client.post('/post', { json: { host: headers.host } }))
		.json()
	console.log(data)
	t.is(data.host, 'postman-echo.com')
})
test('HTTPError', async t => {
	await t.throwsAsync(client.get('/404'), {
		instanceOf: xf.HTTPError
	})
})
