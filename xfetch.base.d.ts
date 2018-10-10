type fn<T, K> = (arg: T) => K
type Constructor<T> = { new (...args: any[]): T }
export interface XPromise<T> extends Promise<T> {
	arrayBuffer(): XPromise<ArrayBuffer>
	blob(): XPromise<Blob>
	formData(): XPromise<FormData>
	json(): XPromise<any>
	text(): XPromise<string>

	arrayBuffer<K>(cb: fn<ArrayBuffer, K>): XPromise<K>
	blob<K>(cb: fn<Blob, K>): XPromise<K>
	formData<K>(cb: fn<FormData, K>): XPromise<K>
	json<K>(cb: fn<any, K>): XPromise<K>
	text<K>(cb: fn<string, K>): XPromise<K>

	arrayBuffer<K extends XPromise<T>>(cb: fn<ArrayBuffer, K>): K
	blob<K extends XPromise<T>>(cb: fn<Blob, K>): K
	formData<K extends XPromise<T>>(cb: fn<FormData, K>): K
	json<K extends XPromise<T>>(cb: fn<any, K>): K
	text<K extends XPromise<T>>(cb: fn<string, K>): K
}
type originalfetch = GlobalFetch['fetch']
export interface XRequestInit extends RequestInit {
	qs?: object | string
	json?: any
	form?: object
	baseURI?: string
	fetch?: originalfetch
	// URL & Request should be constructor
	URL?: Constructor<URL>
	Headers?: Constructor<Headers>
}
export declare class HTTPError extends Error {
	response: Response
}
export interface XFetch {
	(input: string, init?: XRequestInit): XPromise<Response>
	get(input: string, init?: XRequestInit): XPromise<Response>
	post(input: string, init?: XRequestInit): XPromise<Response>
	put(input: string, init?: XRequestInit): XPromise<Response>
	patch(input: string, init?: XRequestInit): XPromise<Response>
	delete(input: string, init?: XRequestInit): XPromise<Response>
	head(input: string, init?: XRequestInit): XPromise<Response>
	extend(defaultInit: XRequestInit): XFetch
	HTTPError: HTTPError
}
