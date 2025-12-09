/**
 * Factory to create the appropriate cookie strategy
 */

import { createLogger } from '@nextnode/logger'

import { CookieStoreStrategy } from './cookie-store-strategy'
import { DocumentCookieStrategy } from './document-cookie-strategy'
import { CookieError } from './errors'
import type { CookieStrategy } from './types'

const strategyLogger = createLogger({ prefix: 'cookie-strategy' })

/**
 * Create the appropriate cookie strategy based on environment
 * Automatically selects Cookie Store API or document.cookie fallback
 */
export const createCookieStrategy = (): CookieStrategy => {
	if (typeof window === 'undefined') {
		throw new CookieError(
			'Cannot create cookie strategy: window is undefined',
			{
				strategy: 'factory',
			},
		)
	}

	const apiAvailable = 'cookieStore' in window
	const isHttps = window.location.protocol === 'https:'

	// Use Cookie Store API only on HTTPS (regardless of isSecureContext)
	// Note: localhost has isSecureContext=true even on HTTP, but Cookie Store API doesn't work
	if (apiAvailable && isHttps) {
		strategyLogger.info('Using Cookie Store API strategy', {
			details: { protocol: window.location.protocol },
		})
		return new CookieStoreStrategy()
	}

	// Fallback to document.cookie
	const fallbackReason = apiAvailable
		? 'Cookie Store API available but HTTP protocol - using document.cookie fallback'
		: 'Cookie Store API not available - using document.cookie fallback'

	strategyLogger.info(fallbackReason, {
		details: {
			apiAvailable,
			protocol: window.location.protocol,
			host: window.location.host,
		},
	})

	return new DocumentCookieStrategy()
}
