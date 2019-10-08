import test from 'ava'
import { Headers } from 'node-fetch'
import xf from '../node'
import FormData from 'form-data'

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
test('post urlencoded:string', async t => {
	const { form } = await client.post('/post', { urlencoded: 'foo=bar' }).json()
	t.deepEqual(form, { foo: 'bar' })
})
test('post urlencoded:object', async t => {
	const { form } = await client.post('/post', { urlencoded: { foo: 'bar' } }).json()
	t.deepEqual(form, { foo: 'bar' })
})
test('post formData:object', async t => {
	const { form } = await client
		.post('/post', {
			formData: {
				foo: 'bar'
			}
		})
		.json()
	t.deepEqual(form, { foo: 'bar' })
})
test('post formData:FormData', async t => {
	const fd = new FormData()
	fd.append('foo', 'bar')
	const { form } = await client.post('/post', { formData: fd }).json()
	t.deepEqual(form, { foo: 'bar' })
})
test('merge qs', async t => {
	const { args } = await client.get('/get?a=b', { qs: { foo: 'bar' } }).json()
	t.deepEqual(args, { foo: 'bar', a: 'b' })
})
test('extend: double', async t => {
	const xc = client.extend({
		headers: {
			'x-send-from': 'xfetch-js'
		}
	})
	const { headers } = await xc.get('/get').json()
	t.is(headers['x-send-from'], 'xfetch-js')
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
	t.is(data.host, 'postman-echo.com')
})
test('headers', async t => {
	const { headers } = await client.get('/get', { headers: { 'x-test': 'hello' } }).json()
	t.is(headers['x-test'], 'hello')
})
test('headers: Headers constructor', async t => {
	const h = new Headers()
	h.append('x-test', 'hello')
	const { headers } = await client.get('/get', { headers: h }).json()
	t.is(headers['x-test'], 'hello')
})
test('HTTPError', async t => {
	await t.throwsAsync(client.get('/404'), {
		instanceOf: xf.HTTPError
	})
})
test('support deep object merging', async t => {
	const client2 = client.extend({
		headers: {
			Authorization: 'Bearer asdfghjkl'
		},
		qs: {
			apiVersion: 2
		}
	})
	const r = await client2.get('/get', { headers: { 'Content-Type': 'application/json' }, qs: { q: 'test' } }).json()
	t.is(r.headers['authorization'], 'Bearer asdfghjkl')
	t.is(r.headers['content-type'], 'application/json')
	t.deepEqual(r.args, {
		apiVersion: '2',
		q: 'test'
	})
})
