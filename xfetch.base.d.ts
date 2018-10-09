type fn<T, K> = (arg: T) => K
export interface XResponsePromise extends Promise<Response> {
	arrayBuffer(): Promise<ArrayBuffer>
	blob(): Promise<Blob>
	formData(): Promise<FormData>
	json(): Promise<any>
	text(): Promise<string>

	arrayBuffer<K>(cb: fn<ArrayBuffer, K>): Promise<K>
	blob<K>(cb: fn<Blob, K>): Promise<K>
	formData<K>(cb: fn<FormData, K>): Promise<K>
	json<K>(cb: fn<any, K>): Promise<K>
	text<K>(cb: fn<string, K>): Promise<K>
}
type originalfetch = GlobalFetch['fetch']
export interface XRequestInit extends RequestInit {
	qs?: object | string
	json?: any
	form?: object
	baseURI?: string
	fetch?: originalfetch
	// URL & Request should be constructor
	URL?: new (...args: any[]) => URL
	Request?: new (...args: any[]) => Request
}
export declare class HTTPError extends Error {
	response: Response
}
export interface XFetch {
	(input: string, init?: XRequestInit): XResponsePromise
	get(input: string, init?: XRequestInit): XResponsePromise
	post(input: string, init?: XRequestInit): XResponsePromise
	put(input: string, init?: XRequestInit): XResponsePromise
	patch(input: string, init?: XRequestInit): XResponsePromise
	delete(input: string, init?: XRequestInit): XResponsePromise
	head(input: string, init?: XRequestInit): XResponsePromise
	extend(defaultInit: XRequestInit): XFetch
	HTTPError: HTTPError
}
