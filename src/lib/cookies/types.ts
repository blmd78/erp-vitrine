/**
 * Type definitions for cookie management
 */

/**
 * Cookie configuration options
 */
export interface CookieOptions {
	path?: string
	domain?: string
	expires?: Date
	maxAge?: number // in seconds
	secure?: boolean
	sameSite?: 'strict' | 'lax' | 'none'
}

/**
 * Cookie strategy interface
 */
export interface CookieStrategy {
	get(name: string): Promise<string | null>
	set(name: string, value: string, options: CookieOptions): Promise<boolean>
	delete(
		name: string,
		options: Pick<CookieOptions, 'path' | 'domain'>,
	): Promise<boolean>
	getAll(): Promise<Record<string, string>>
}
