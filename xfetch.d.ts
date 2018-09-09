interface XPromise<T> extends Promise<T> {
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
type originalfetch = GlobalFetch['fetch']
type fetch = (input: string, init?: XRequestInit) => XPromise<Response>
interface XFetch {
	(input: string, init?: XRequestInit): XPromise<Response>
	get: fetch
	post: fetch
	put: fetch
	patch: fetch
	delete: fetch
	head: fetch
	create(fetch: originalfetch): XFetch
}
declare const xfetch: XFetch
export = xfetch
