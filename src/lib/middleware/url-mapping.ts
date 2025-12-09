/**
 * URL Mapping and Locale Handling Middleware
 * Handles intelligent URL mapping with locale detection and redirection
 */

import { defineMiddleware } from 'astro:middleware'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n/config'

import { getPreferredLocaleFromCookie, shouldSkipRequest } from './utils'

import type { Locale } from '@/types/i18n'

/**
 * Middleware for intelligent URL mapping with locale handling
 *
 * Strategy:
 * - Default locale (fr): URLs without prefix, use rewrite to maintain clean URLs
 * - Other locales (en): URLs with prefix, redirect when accessed without prefix
 */
export const urlMappingMiddleware = defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url)
	const pathname = url.pathname

	// Skip for assets, API routes, and other system paths
	if (shouldSkipRequest(pathname)) {
		return next()
	}

	const preferredLocale = getPreferredLocaleFromCookie(
		context.request,
		DEFAULT_LOCALE,
	)

	// Parse the current URL to extract locale
	const { locale: currentLocale, pathnameWithoutLocale } = parseUrlLocale(
		pathname,
		SUPPORTED_LOCALES,
	)

	// If URL already has a locale prefix, continue
	if (currentLocale) {
		return next()
	}

	// No locale in URL - determine target locale from cookie
	const targetLocale = preferredLocale
	const isDefaultLocale = targetLocale === DEFAULT_LOCALE

	// Build the expected URL for the target locale
	const expectedUrl = buildLocalizedUrl(
		pathnameWithoutLocale,
		targetLocale,
		isDefaultLocale,
	)

	// Apply appropriate handling based on locale type
	if (isDefaultLocale) {
		// Default locale: rewrite to keep clean URLs
		return context.rewrite(`/${targetLocale}${pathnameWithoutLocale}`)
	}

	// Other locales: redirect to show locale in URL
	return context.redirect(expectedUrl)
})

/**
 * Parses the locale from a URL pathname
 * Returns the detected locale and the pathname without locale prefix
 */
const parseUrlLocale = (
	pathname: string,
	supportedLocales: readonly Locale[],
): {
	locale: Locale | null
	pathnameWithoutLocale: string
} => {
	for (const locale of supportedLocales) {
		if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
			return {
				locale,
				pathnameWithoutLocale:
					pathname.slice(`/${locale}`.length) || '/',
			}
		}
	}
	return { locale: null, pathnameWithoutLocale: pathname }
}

/**
 * Builds a localized URL based on the target locale
 */
const buildLocalizedUrl = (
	pathname: string,
	targetLocale: string,
	isDefaultLocale: boolean,
): string => {
	// Handle how-we-work redirect to homepage
	if (pathname === '/how-we-work' || pathname === '/how-we-work/') {
		return isDefaultLocale ? '/' : `/${targetLocale}/`
	}

	// Default locale: no prefix needed (clean URLs)
	if (isDefaultLocale) {
		return pathname
	}

	// Other locales: add locale prefix
	return `/${targetLocale}${pathname}`
}
