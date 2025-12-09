/**
 * Error Handler Middleware
 * Centralized handling of 404 and 500 errors with i18n support
 *
 * This middleware intercepts responses with 404 or 500 status codes
 * and rewrites them to the appropriate localized error pages.
 *
 * Pure transformation middleware - no logging (handled by loggingMiddleware)
 */

import { defineMiddleware } from 'astro:middleware'

import { DEFAULT_LOCALE } from '@/i18n/config'

/**
 * Path prefixes to skip (bundled assets + organized folders)
 */
const SKIP_PATH_PREFIXES = [
	'/404', // Error pages (avoid infinite loop)
	'/500',
	'/_astro/', // Astro bundled assets (JS, CSS with hashes)
	'/fonts/', // Static fonts from /public/fonts/
] as const

/**
 * File extensions in /public/ root (logos, favicons, manifests)
 */
const SKIP_ROOT_FILES = /\.(png|svg|webp|ico|webmanifest|txt)$/

/**
 * Middleware for handling error responses
 *
 * This should be placed BEFORE loggingMiddleware to allow proper
 * error page rewriting before final logging
 */
export const errorHandlerMiddleware = defineMiddleware(
	async (context, next) => {
		const pathname = context.url.pathname

		// Early exit for assets (BEFORE await next())
		if (
			SKIP_PATH_PREFIXES.some(prefix => pathname.includes(prefix)) ||
			SKIP_ROOT_FILES.test(pathname)
		) {
			return next()
		}

		// Process the request
		const response = await next()

		// Get current locale from context (injected by i18nMiddleware)
		const locale = context.locals.locale ?? DEFAULT_LOCALE

		// Handle 404 Not Found errors - rewrite to localized page
		if (response.status === 404) {
			// Store original path for logging middleware
			context.locals.errorRewrite = {
				originalPath: pathname,
				targetPath: `/${locale}/404`,
				status: 404,
			}
			// Use next() to rewrite WITHOUT retriggering middleware chain
			return next(`/${locale}/404`)
		}

		// Handle 500 Internal Server Error - rewrite to localized page
		if (response.status === 500) {
			// Store original path for logging middleware
			context.locals.errorRewrite = {
				originalPath: pathname,
				targetPath: `/${locale}/500`,
				status: 500,
			}
			// Use next() to rewrite WITHOUT retriggering middleware chain
			return next(`/${locale}/500`)
		}

		// For all other responses, pass through unchanged
		return response
	},
)
