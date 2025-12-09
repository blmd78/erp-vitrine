/**
 * Type-safe cookie management with Cookie Store API and document.cookie fallback
 * Uses Strategy pattern for clean separation between modern and legacy implementations
 */

import { createLogger } from '@nextnode/logger'

import { createCookieStrategy } from './factory'
import type { CookieOptions } from './types'

const cookieLogger = createLogger({ prefix: 'cookie' })

// Singleton strategy instance (created once per session)
let strategy: ReturnType<typeof createCookieStrategy> | null = null

/**
 * Get the cookie strategy instance (lazy initialization)
 */
const getStrategy = () => {
	if (!strategy) {
		strategy = createCookieStrategy()
	}
	return strategy
}

/**
 * Set a cookie with automatic strategy selection
 * Tries Cookie Store API first, falls back to document.cookie if unavailable
 */
export const setCookie = async (
	name: string,
	value: string,
	options: CookieOptions = {},
): Promise<boolean> => {
	if (typeof window === 'undefined') {
		cookieLogger.warn('Cannot set cookie: window is undefined')
		return false
	}

	try {
		return await getStrategy().set(name, value, options)
	} catch (error) {
		cookieLogger.error('Failed to set cookie', {
			details: { name, error },
		})
		return false
	}
}

/**
 * Get a cookie value
 */
export const getCookie = async (name: string): Promise<string | null> => {
	if (typeof window === 'undefined') {
		return null
	}

	try {
		return await getStrategy().get(name)
	} catch (error) {
		cookieLogger.error('Failed to get cookie', {
			details: { name, error },
		})
		return null
	}
}

/**
 * Remove a cookie
 */
export const removeCookie = async (
	name: string,
	options: Pick<CookieOptions, 'path' | 'domain'> = {},
): Promise<boolean> => {
	if (typeof window === 'undefined') {
		return false
	}

	try {
		return await getStrategy().delete(name, options)
	} catch (error) {
		cookieLogger.error('Failed to remove cookie', {
			details: { name, error },
		})
		return false
	}
}

/**
 * Get all cookies as an object
 */
export const getAllCookies = async (): Promise<Record<string, string>> => {
	if (typeof window === 'undefined') {
		return {}
	}

	try {
		return await getStrategy().getAll()
	} catch (error) {
		cookieLogger.error('Failed to get all cookies', {
			details: { error },
		})
		return {}
	}
}

export { createServerCookieManager } from './server'
// Re-export types and server utilities
export type { CookieOptions } from './types'
