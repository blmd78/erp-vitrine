/**
 * Language management utilities for client-side language switching
 * Handles locale switching, URL generation, and persistence via cookies
 */

import { DEFAULT_LOCALE, isValidLocale, SUPPORTED_LOCALES } from '@/i18n/config'
import { COOKIE_NAMES } from '@/lib/constants'
import { setCookie } from '@/lib/cookies'

import type { Locale } from '@/types/i18n'

/**
 * Generate the correct URL for a given locale
 * Uses dynamic locale detection based on SUPPORTED_LOCALES
 */
const buildLocaleUrl = (newLocale: Locale): string => {
	const currentPath = window.location.pathname

	// Build regex pattern from supported locales
	const localePattern = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})`)
	const pathWithoutLang = currentPath.replace(localePattern, '') || '/'

	// Default locale: no prefix needed (clean URLs)
	if (newLocale === DEFAULT_LOCALE) {
		return pathWithoutLang
	}

	// Other locales: add locale prefix
	return `/${newLocale}${pathWithoutLang}`
}

/**
 * Change the current language and navigate to the new URL
 */
export const changeLanguage = async (newLocale: Locale): Promise<void> => {
	// Validate locale against supported locales
	const safeLocale = SUPPORTED_LOCALES.includes(newLocale)
		? newLocale
		: DEFAULT_LOCALE

	// Update HTML lang attribute and global state
	document.documentElement.setAttribute('lang', safeLocale)
	window.currentLanguage = safeLocale

	// Build new URL
	const newPath = buildLocaleUrl(safeLocale)

	// Set preference in cookie and wait for completion before navigation
	await setCookie(COOKIE_NAMES.LANG, safeLocale, {
		path: '/',
		maxAge: 365 * 24 * 60 * 60, // 1 year
		sameSite: 'lax',
	})

	// Navigate to new URL after cookie is written
	window.location.href = newPath
}

/**
 * Set up language selector event listeners
 */
const setupLanguageSelectors = (): void => {
	const languageButtons = document.querySelectorAll('[data-lang]')

	if (languageButtons.length === 0) {
		return
	}

	languageButtons.forEach(button => {
		button.addEventListener('click', async e => {
			e.preventDefault()
			const clickedLang = button.getAttribute('data-lang')

			if (isValidLocale(clickedLang)) {
				await changeLanguage(clickedLang)
			}
		})
	})
}

/**
 * Initialize language management: set HTML lang and set up event listeners
 */
export const initLanguage = (): void => {
	// Get current language from global or fallback
	const currentLang = (window.currentLanguage as Locale) || DEFAULT_LOCALE

	// Set initial HTML lang attribute and ensure global state
	document.documentElement.setAttribute('lang', currentLang)
	window.currentLanguage = currentLang

	// Set up language selector buttons
	setupLanguageSelectors()
}

// Make functions available globally
window.changeLanguage = changeLanguage
window.initLanguage = initLanguage

// Global types are declared in types/global.d.ts
