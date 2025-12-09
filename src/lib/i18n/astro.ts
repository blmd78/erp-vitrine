// ====================================
// ASTRO INTEGRATION FOR I18N SYSTEM
// ====================================
// Functions and helpers to use i18n in the Astro environment

import type { APIContext } from 'astro'

import { COOKIE_NAMES } from '@/lib/constants'
import { createServerCookieManager } from '@/lib/cookies'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../../i18n/config'
import { createT, setGlobalLocale } from './index'

import type { Locale, TFunction } from '@/types/i18n'

// ====================================
// DÉTECTION DE LA LOCALE
// ====================================

/**
 * Extract locale from Astro URL path - Dynamic detection
 * /en/page → 'en', /fr/page → 'fr', /es/page → 'es', /page → default locale
 * Automatically supports any locale defined in SUPPORTED_LOCALES
 */
export function getLocaleFromPath(pathname: string): Locale {
	// Check each supported locale
	for (const locale of SUPPORTED_LOCALES) {
		if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
			return locale
		}
	}
	// Default to DEFAULT_LOCALE for all other paths
	return DEFAULT_LOCALE
}

/**
 * Detect user's preferred locale with fallback priority:
 * 1. URL path (/fr/page, /en/page)
 * 2. Cookie preference
 * 3. Browser Accept-Language header
 * 4. Default locale (en)
 */
export function detectUserLocale(request: Request): Locale {
	const url = new URL(request.url)
	const pathname = url.pathname

	// Priority 1: Check URL path first
	const pathLocale = getLocaleFromPath(pathname)
	if (
		pathLocale !== DEFAULT_LOCALE ||
		pathname.startsWith('/en/') ||
		pathname === '/en'
	) {
		return pathLocale
	}

	// Priority 2: Check cookie preference
	const cookieManager = createServerCookieManager(request)
	const cookieLocale = cookieManager.get(COOKIE_NAMES.LANG)
	if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
		return cookieLocale as Locale
	}

	// Priority 3: Check browser Accept-Language header
	const browserLocale = getBrowserPreferredLocale(request)
	if (browserLocale && SUPPORTED_LOCALES.includes(browserLocale)) {
		return browserLocale
	}

	// Priority 4: Default fallback
	return DEFAULT_LOCALE
}

/**
 * Initialize i18n system for server-side rendering
 * This should be called in middleware or at the beginning of Astro components
 */
export function initializeI18n(request: Request): {
	locale: Locale
	t: TFunction
} {
	const locale = detectUserLocale(request)

	// Set the global locale for server-side rendering
	setGlobalLocale(locale)

	// Create and return a locale-specific t function
	const t = createT(locale)

	return { locale, t }
}

// ====================================
// HELPERS FOR ASTRO COMPONENTS
// ====================================

/**
 * Get locale and t function from Astro context
 * Usage in .astro files:
 *
 * ```astro
 * ---
 * import { getI18nFromContext } from '../lib/i18n/astro'
 * const { locale, t } = getI18nFromContext(Astro.request)
 * ---
 * <h1>{t('home.hero.title')}</h1>
 * ```
 */
export function getI18nFromContext(request: Request): {
	locale: Locale
	t: TFunction
} {
	return initializeI18n(request)
}

/**
 * Helper for API routes to get i18n context
 */
export function getI18nForAPI(context: APIContext): {
	locale: Locale
	t: TFunction
} {
	return initializeI18n(context.request)
}

// ====================================
// HELPERS FOR LOCALIZED URLS
// ====================================

/**
 * Get the alternate locale for a given locale
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
	return currentLocale === 'en' ? 'fr' : 'en'
}

/**
 * Convert a path to its localized version
 * Examples:
 * - pathToLocalized('en', '/about') → '/en/about'
 * - pathToLocalized('fr', '/about') → '/fr/about'
 * - pathToLocalized('en', '/') → '/en/'
 */
export function pathToLocalized(locale: Locale, path: string): string {
	// Ensure path starts with /
	let normalizedPath = path
	if (!normalizedPath.startsWith('/')) {
		normalizedPath = `/${normalizedPath}`
	}

	// Remove existing locale prefix if any
	const cleanPath = normalizedPath.replace(/^\/(en|fr)(\/|$)/, '/')

	// Add locale prefix
	return `/${locale}${cleanPath === '/' ? '/' : cleanPath}`
}

/**
 * Remove locale prefix from a path
 * Examples:
 * - removeLocalePrefix('/en/about') → '/about'
 * - removeLocalePrefix('/fr/contact') → '/contact'
 * - removeLocalePrefix('/about') → '/about'
 */
export function removeLocalePrefix(path: string): string {
	return path.replace(/^\/(en|fr)(\/|$)/, '/')
}

/**
 * Get all localized versions of a path
 */
export function getLocalizedPaths(path: string): Record<Locale, string> {
	return {
		en: pathToLocalized('en', path),
		fr: pathToLocalized('fr', path),
	}
}

// ====================================
// HELPERS FOR METADATA
// ====================================

/**
 * Generate hreflang links for SEO
 * Usage in Astro Layout:
 *
 * ```astro
 * ---
 * import { getHrefLangLinks } from '../lib/i18n/astro'
 * const hrefLangLinks = getHrefLangLinks(Astro.request)
 * ---
 * <head>
 *   {hrefLangLinks.map(link =>
 *     <link rel="alternate" hreflang={link.hreflang} href={link.href} />
 *   )}
 * </head>
 * ```
 */
export function getHrefLangLinks(request: Request): Array<{
	hreflang: string
	href: string
}> {
	const url = new URL(request.url)
	const currentPath = removeLocalePrefix(url.pathname)

	return [
		{
			hreflang: 'en',
			href: `${url.origin}${pathToLocalized('en', currentPath)}`,
		},
		{
			hreflang: 'fr',
			href: `${url.origin}${pathToLocalized('fr', currentPath)}`,
		},
		{
			hreflang: 'x-default',
			href: `${url.origin}${pathToLocalized('en', currentPath)}`,
		},
	]
}

// ====================================
// VALIDATION ET UTILITAIRES
// ====================================

/**
 * Get browser preferred language from Accept-Language header
 * Fallback to 'en' if not supported
 */
export function getBrowserPreferredLocale(request: Request): Locale {
	const acceptLanguage = request.headers.get('accept-language')
	if (!acceptLanguage) return 'en'

	// Simple check for French preference
	if (acceptLanguage.includes('fr')) return 'fr'
	return 'en'
}

// ====================================
// TYPES FOR MIDDLEWARE
// ====================================

export interface I18nMiddlewareLocals {
	locale: Locale
	t: TFunction
}

// ====================================
// TYPES EXPORTS
// ====================================

export type { Locale, TFunction }
