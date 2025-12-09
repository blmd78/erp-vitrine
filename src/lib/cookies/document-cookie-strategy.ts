/**
 * Document.cookie fallback strategy (HTTP, older browsers)
 */

import { createLogger } from '@nextnode/logger'

import { CookieError } from './errors'
import type { CookieOptions, CookieStrategy } from './types'

const strategyLogger = createLogger({ prefix: 'cookie-strategy' })

export class DocumentCookieStrategy implements CookieStrategy {
	private readonly strategyName = 'DocumentCookie'

	async get(name: string): Promise<string | null> {
		try {
			const cookieName = `${encodeURIComponent(name)}=`
			const cookies = document.cookie.split(';')

			for (const cookie of cookies) {
				const trimmedCookie = cookie.trim()
				if (trimmedCookie.startsWith(cookieName)) {
					const value = trimmedCookie.substring(cookieName.length)
					return decodeURIComponent(value)
				}
			}

			return null
		} catch (error) {
			throw new CookieError('Failed to get cookie', {
				name,
				error,
				strategy: this.strategyName,
			})
		}
	}

	async set(
		name: string,
		value: string,
		options: CookieOptions,
	): Promise<boolean> {
		try {
			const finalOptions: CookieOptions = {
				path: '/',
				sameSite: 'lax',
				...options,
			}

			// Chrome blocks permanent cookies on localhost HTTP
			const isLocalhost =
				window.location.hostname === 'localhost' ||
				window.location.hostname === '127.0.0.1'
			const isHttp = window.location.protocol === 'http:'
			const skipExpiration = isLocalhost && isHttp

			if (
				skipExpiration &&
				(finalOptions.maxAge || finalOptions.expires)
			) {
				strategyLogger.info(
					'Skipping cookie expiration on localhost HTTP (Chrome restriction)',
					{
						details: {
							hostname: window.location.hostname,
							protocol: window.location.protocol,
						},
					},
				)
			}

			let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

			if (finalOptions.path) {
				cookieString += `; path=${finalOptions.path}`
			}
			if (finalOptions.domain) {
				cookieString += `; domain=${finalOptions.domain}`
			}
			if (finalOptions.expires && !skipExpiration) {
				cookieString += `; expires=${finalOptions.expires.toUTCString()}`
			}
			if (finalOptions.maxAge && !skipExpiration) {
				cookieString += `; max-age=${finalOptions.maxAge}`
			}
			if (finalOptions.secure && window.location.protocol === 'https:') {
				cookieString += '; secure'
			}
			if (finalOptions.sameSite) {
				cookieString += `; SameSite=${finalOptions.sameSite}`
			}

			strategyLogger.info('Writing cookie with document.cookie', {
				details: {
					cookieString,
					protocol: window.location.protocol,
				},
			})

			// biome-ignore lint/suspicious/noDocumentCookie: Intentional fallback for browsers without Cookie Store API
			document.cookie = cookieString

			// Verify cookie was written
			const verification = document.cookie
			const wasWritten = verification.includes(encodeURIComponent(name))

			strategyLogger.info('Cookie write verification', {
				details: {
					name,
					wasWritten,
					allCookies: verification,
				},
			})

			return true
		} catch (error) {
			throw new CookieError('Failed to set cookie', {
				name,
				error,
				strategy: this.strategyName,
			})
		}
	}

	async delete(
		name: string,
		options: Pick<CookieOptions, 'path' | 'domain'>,
	): Promise<boolean> {
		try {
			let cookieString = `${encodeURIComponent(name)}=`

			if (options.path) {
				cookieString += `; path=${options.path}`
			}
			if (options.domain) {
				cookieString += `; domain=${options.domain}`
			}
			cookieString += '; expires=Thu, 01 Jan 1970 00:00:00 GMT'

			// biome-ignore lint/suspicious/noDocumentCookie: Intentional fallback for browsers without Cookie Store API
			document.cookie = cookieString
			return true
		} catch (error) {
			throw new CookieError('Failed to delete cookie', {
				name,
				error,
				strategy: this.strategyName,
			})
		}
	}

	async getAll(): Promise<Record<string, string>> {
		try {
			const cookies: Record<string, string> = {}
			const cookieString = document.cookie

			if (!cookieString) {
				return cookies
			}

			cookieString.split(';').forEach(cookie => {
				const [name, value] = cookie.trim().split('=')
				if (name && value) {
					cookies[decodeURIComponent(name)] =
						decodeURIComponent(value)
				}
			})

			return cookies
		} catch (error) {
			throw new CookieError('Failed to get all cookies', {
				error,
				strategy: this.strategyName,
			})
		}
	}
}
