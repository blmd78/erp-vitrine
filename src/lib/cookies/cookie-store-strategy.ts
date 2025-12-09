/**
 * Cookie Store API strategy (modern browsers, HTTPS only)
 */

import { CookieError } from './errors'
import type { CookieOptions, CookieStrategy } from './types'

import type { CookieInit } from '@/types/cookie-store'

export class CookieStoreStrategy implements CookieStrategy {
	private readonly strategyName = 'CookieStore'

	async get(name: string): Promise<string | null> {
		try {
			const cookie = await window.cookieStore.get(name)
			return cookie?.value ?? null
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
			const cookieInit: CookieInit = {
				name,
				value,
				path: options.path ?? '/',
				sameSite: options.sameSite ?? 'lax',
			}

			if (options.domain) cookieInit.domain = options.domain

			// Cookie Store API uses expires (timestamp), convert from Date or maxAge
			if (options.expires) {
				cookieInit.expires = options.expires.getTime()
			} else if (options.maxAge) {
				cookieInit.expires = Date.now() + options.maxAge * 1000
			}

			await window.cookieStore.set(cookieInit)
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
			await window.cookieStore.delete({
				name,
				path: options.path ?? '/',
				domain: options.domain,
			})
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
			const cookies = await window.cookieStore.getAll()
			return cookies.reduce(
				(acc, cookie) => {
					if (cookie.name && cookie.value) {
						acc[cookie.name] = cookie.value
					}
					return acc
				},
				{} as Record<string, string>,
			)
		} catch (error) {
			throw new CookieError('Failed to get all cookies', {
				error,
				strategy: this.strategyName,
			})
		}
	}
}
