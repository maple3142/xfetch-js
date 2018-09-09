interface XResponsePromise extends Promise<Response> {
	arrayBuffer(): Promise<ArrayBuffer>
	blob(): Promise<Blob>
	formData(): Promise<FormData>
	json(): Promise<any>
	text(): Promise<string>
}
interface XRequestInit extends RequestInit {
	json?: any
	form?: object
	qs?: object
}
declare class HTTPError extends Error{
	response: Response
}
type originalfetch = GlobalFetch['fetch']
type fetch = (input: string, init?: XRequestInit) => XResponsePromise
interface XFetch {
	(input: string, init?: XRequestInit): XResponsePromise
	get: fetch
	post: fetch
	put: fetch
	patch: fetch
	delete: fetch
	head: fetch
	create(fetch: originalfetch, baseURI?: string): XFetch
	base(baseURI: string): XFetch
	HTTPError: HTTPError
}
declare const xfetch: XFetch
export = xfetch
