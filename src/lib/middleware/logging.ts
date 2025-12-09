/**
 * Request/Response Logging Middleware
 * Handles structured logging of HTTP requests and responses
 *
 * Logging strategy:
 * - Development: Log ALL requests (full observability)
 * - Production: Log errors (>=400) + slow requests (>1s)
 *
 * This middleware MUST be placed AFTER errorHandlerMiddleware
 * to capture the final response including any error page rewrites
 */

import { defineMiddleware } from 'astro:middleware'

import { middlewareLogger } from '../logging'
import { extractUserIP } from './utils'

/**
 * Development mode flag (constant across all requests)
 */
const IS_DEV = import.meta.env.DEV

/**
 * Slow request threshold in milliseconds
 */
const SLOW_REQUEST_THRESHOLD = 1000

/**
 * Log configuration for different request types
 */
const LOG_CONFIG = {
	error: { level: 'error' as const, message: 'Request failed' },
	slow: { level: 'warn' as const, message: 'Slow request detected' },
	success: { level: 'info' as const, message: 'Request completed' },
} as const

/**
 * Determine log type based on request characteristics
 */
const getLogType = (
	isError: boolean,
	isSlow: boolean,
): keyof typeof LOG_CONFIG => {
	if (isError) return 'error'
	if (isSlow) return 'slow'
	return 'success'
}

/**
 * Path prefixes to skip logging (static assets)
 */
const SKIP_PATH_PREFIXES = [
	'/_image', // Astro image optimization endpoint
	'/_astro/', // Astro bundled assets (JS, CSS with hashes)
	'/fonts/', // Static fonts from /public/fonts/
] as const

/**
 * File extensions in /public/ root to skip (logos, favicons, manifests)
 */
const SKIP_ROOT_FILES = /\.(png|svg|webp|ico|webmanifest|txt)$/

/**
 * Middleware for logging requests and responses
 */
export const loggingMiddleware = defineMiddleware(async (context, next) => {
	const { request } = context
	const startTime = Date.now()
	const url = new URL(request.url)
	const path = url.pathname

	// Skip logging for static assets
	if (
		SKIP_PATH_PREFIXES.some(prefix => path.startsWith(prefix)) ||
		SKIP_ROOT_FILES.test(path)
	) {
		return next()
	}

	// Process the request
	const response = await next()

	// Calculate request duration
	const duration = Date.now() - startTime

	// Calculate request characteristics
	const isError = response.status >= 400
	const isSlow = duration > SLOW_REQUEST_THRESHOLD

	// Log if: dev mode OR error OR slow request
	if (!IS_DEV && !isError && !isSlow) {
		return response
	}

	// Skip logging errors that will be rewritten (first middleware pass)
	// Only log after error handler sets errorRewrite context (second pass)
	const errorRewrite = context.locals.errorRewrite

	if (isError && !errorRewrite) {
		// This is an error that will be rewritten, skip logging now
		// It will be logged after rewrite with full context
		return response
	}

	// Prepare common log details
	const logDetails = {
		method: request.method,
		path: errorRewrite ? errorRewrite.originalPath : path,
		...(errorRewrite && { rewrittenTo: errorRewrite.targetPath }),
		duration,
		userAgent: request.headers.get('user-agent'),
		referer: request.headers.get('referer'),
		ip: extractUserIP(request),
	}

	// Special case: error with rewrite
	if (errorRewrite && path === errorRewrite.targetPath) {
		middlewareLogger.error('Request failed - served error page', {
			scope: 'http-error',
			status: response.status,
			details: logDetails,
		})
		return response
	}

	// Standard logging with dynamic level
	const { level, message } = LOG_CONFIG[getLogType(isError, isSlow)]

	middlewareLogger[level](message, {
		scope: 'http-request',
		status: response.status,
		details: logDetails,
	})

	return response
})
