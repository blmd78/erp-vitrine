/**
 * TypeScript definitions for Cookie Store API
 * Based on MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API
 */

/**
 * Cookie initialization options for setting cookies via Cookie Store API
 */
export interface CookieInit {
	name: string
	value: string
	domain?: string
	expires?: number // Unix timestamp in milliseconds
	path?: string
	sameSite?: 'strict' | 'lax' | 'none'
	partitioned?: boolean
}

/**
 * Cookie object returned by Cookie Store API get/getAll methods
 */
export interface Cookie {
	domain: string
	expires: number // Unix timestamp in milliseconds
	name: string
	partitioned: boolean
	path: string
	sameSite: 'strict' | 'lax' | 'none'
	secure: boolean
	value: string
}

/**
 * Options for getting cookies
 */
export interface CookieStoreGetOptions {
	name: string
	url?: string
}

/**
 * Options for deleting cookies
 */
export interface CookieStoreDeleteOptions {
	name: string
	domain?: string
	path?: string
	partitioned?: boolean
}

/**
 * Cookie Store API interface
 */
export interface CookieStore {
	get(name: string): Promise<Cookie | null>
	get(options: CookieStoreGetOptions): Promise<Cookie | null>

	getAll(): Promise<Cookie[]>
	getAll(name: string): Promise<Cookie[]>
	getAll(options: CookieStoreGetOptions): Promise<Cookie[]>

	set(name: string, value: string): Promise<void>
	set(options: CookieInit): Promise<void>

	delete(name: string): Promise<void>
	delete(options: CookieStoreDeleteOptions): Promise<void>
}

/**
 * Extend Window interface with cookieStore
 */
declare global {
	interface Window {
		cookieStore: CookieStore
	}
}
