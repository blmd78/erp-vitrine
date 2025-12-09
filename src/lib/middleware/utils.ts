/**
 * Utility functions for middleware route detection and filtering
 * Shared logic to avoid duplication across middleware modules
 */

import { COOKIE_NAMES } from '@/lib/constants'

/**
 * Check if the request is for an asset file
 */
export const isAssetRequest = (pathname: string): boolean =>
	pathname.includes('.')

/**
 * Check if the request is for an API route
 */
export const isApiRequest = (pathname: string): boolean =>
	pathname.startsWith('/api/')

/**
 * System and monitoring routes that should bypass i18n middleware
 * These routes need direct access without locale prefixes for external services
 */
const SYSTEM_MONITORING_ROUTES = [
	'/health', // Railway health check
	'/monitoring', // Future monitoring dashboard
	'/metrics', // Future metrics endpoint
	'/status', // Future status page
] as const

/**
 * Check if the request is for a system/internal route
 */
export const isSystemRequest = (pathname: string): boolean =>
	pathname.startsWith('/_')

/**
 * Check if the request is for a monitoring/system route
 */
export const isMonitoringRoute = (
	pathname: string,
): pathname is (typeof SYSTEM_MONITORING_ROUTES)[number] =>
	SYSTEM_MONITORING_ROUTES.some(route => route === pathname)

/**
 * Check if the request should be skipped by most middleware
 * (assets, API routes, system paths, monitoring routes)
 */
export const shouldSkipRequest = (pathname: string): boolean =>
	isSystemRequest(pathname) ||
	isApiRequest(pathname) ||
	isAssetRequest(pathname) ||
	isMonitoringRoute(pathname)

/**
 * Check if the request should be logged
 * Excludes specific asset types and system routes
 */
export const shouldLogRequest = (pathname: string): boolean =>
	!pathname.startsWith('/api/') &&
	!pathname.startsWith('/_') &&
	!pathname.includes('.') &&
	!pathname.endsWith('.css') &&
	!pathname.endsWith('.js') &&
	!pathname.endsWith('.ico')

/**
 * Check if the request should be tracked for metrics
 * Similar to logging but might have different criteria in the future
 */
export const shouldTrackMetrics = (pathname: string): boolean =>
	!isApiRequest(pathname) &&
	!isSystemRequest(pathname) &&
	!isAssetRequest(pathname)

/**
 * Check if request comes from internal navigation
 */
export const isInternalNavigation = (request: Request): boolean => {
	const referer = request.headers.get('referer')
	const url = new URL(request.url)
	return referer?.includes(url.origin) ?? false
}

/**
 * Extract user IP from request headers
 */
export const extractUserIP = (request: Request): string | null =>
	request.headers.get('cf-connecting-ip') ||
	request.headers.get('x-forwarded-for') ||
	null

/**
 * Get preferred locale from cookie
 */
export const getPreferredLocaleFromCookie = (
	request: Request,
	defaultLocale: string,
): string => {
	const cookieHeader = request.headers.get('cookie')
	if (!cookieHeader) return defaultLocale

	const match = cookieHeader.match(new RegExp(`${COOKIE_NAMES.LANG}=([^;]+)`))
	return match?.[1] || defaultLocale
}

/**
 * Get theme preference from cookie
 */
export const getThemeFromCookie = (request: Request): string | null => {
	const cookieHeader = request.headers.get('cookie')
	if (!cookieHeader) return null

	const match = cookieHeader.match(
		new RegExp(`${COOKIE_NAMES.THEME}=([^;]+)`),
	)
	return match?.[1] || null
}

/**
 * Resolve theme preference to actual theme (light or dark)
 * Handles 'system' preference by checking prefers-color-scheme
 */
export const resolveTheme = (
	themePreference: string | null,
	request: Request,
): 'light' | 'dark' => {
	// If no preference, default to light
	if (!themePreference) return 'light'

	// If explicit light or dark, use it
	if (themePreference === 'light' || themePreference === 'dark') {
		return themePreference
	}

	// If 'system', check Accept header or default to light
	// Note: We can't reliably detect system preference server-side,
	// so we default to light for SSR and let client update if needed
	if (themePreference === 'system') {
		// Check Sec-CH-Prefers-Color-Scheme header (if available)
		const prefersDark = request.headers.get('Sec-CH-Prefers-Color-Scheme')
		if (prefersDark === 'dark') return 'dark'
		return 'light'
	}

	// Invalid preference, default to light
	return 'light'
}
