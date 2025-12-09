import { createLogger } from '@nextnode/logger'

/**
 * Detect if running in browser environment
 */
const isBrowser =
	typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * Create a browser-safe logger instance
 * Uses production mode (JSON) in browsers to avoid ANSI color codes
 */
const createBrowserSafeLogger = (prefix?: string) => {
	return createLogger({
		prefix,
		// Force production mode in browsers to avoid ANSI codes
		environment: isBrowser ? 'production' : undefined,
	})
}

export const middlewareLogger = createBrowserSafeLogger('middleware')
export const emailLogger = createBrowserSafeLogger('email-api')
export const layoutLogger = createBrowserSafeLogger('layout')
export const configLogger = createBrowserSafeLogger('config')
export const i18nLogger = createBrowserSafeLogger('i18n')
export const metricsLogger = createBrowserSafeLogger('metrics')
export const componentLogger = createBrowserSafeLogger('component')
