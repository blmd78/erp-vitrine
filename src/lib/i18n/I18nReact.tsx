// ====================================
// REACT HOOKS FOR I18N SYSTEM
// ====================================
// Optimized hooks for using i18n in React components

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

import type { PropsWithChildren, ReactNode } from 'react'

import { COOKIE_NAMES } from '@/lib/constants'
import { getCookie, setCookie } from '@/lib/cookies'

import { getLocaleFromPath } from './astro'
import { createT, setGlobalLocale } from './index'

import type { InterpolationVariables, Locale, TFunction } from '@/types/i18n'

// ====================================
// MAIN useI18n HOOK
// ====================================

export interface UseI18nReturn {
	locale: Locale
	t: TFunction
	setLocale: (newLocale: Locale) => void
	toggleLocale: () => void
	isLoading: boolean
}

/**
 * Main i18n hook for React components
 * Uses React context when available (client-side), falls back to URL detection for SSR
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { t, locale, setLocale } = useI18n()
 *
 *   return (
 *     <div>
 *       <h1>{t('home.hero.title')}</h1>
 *       <button onClick={() => setLocale('fr')}>
 *         Switch to French
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useI18n(initialLocale?: Locale): UseI18nReturn {
	const context = useContext(I18nContext)

	// Always declare hooks at the top level
	const [locale, setLocaleState] = useState<Locale>(() => {
		if (initialLocale) {
			return initialLocale
		}
		// Fallback to URL-based detection for legacy components
		if (typeof window !== 'undefined') {
			return getLocaleFromPath(window.location.pathname)
		}
		return 'en'
	})

	const [isLoading, setIsLoading] = useState(false)

	// Create t function for current locale
	const t = useMemo(() => createT(locale), [locale])

	// Update global locale when local state changes
	useEffect(() => {
		setGlobalLocale(locale)
	}, [locale])

	// Set locale with optional navigation
	const setLocale = useCallback(
		(newLocale: Locale, navigate = true) => {
			if (newLocale === locale) return

			setIsLoading(true)
			setLocaleState(newLocale)

			// Store preference in cookie
			if (typeof window !== 'undefined') {
				setCookie(COOKIE_NAMES.LANG, newLocale, {
					path: '/',
					maxAge: 365 * 24 * 60 * 60, // 1 year
					sameSite: 'lax',
				})

				// Navigate to new locale if requested
				if (navigate) {
					const currentPath = window.location.pathname
					const newPath = switchLocaleInPath(currentPath, newLocale)
					if (newPath !== currentPath) {
						window.location.href = newPath
						return // Don't set loading to false, we're navigating
					}
				}
			}

			setIsLoading(false)
		},
		[locale],
	)

	// Toggle between locales
	const toggleLocale = useCallback(() => {
		const newLocale = locale === 'en' ? 'fr' : 'en'
		setLocale(newLocale)
	}, [locale, setLocale])

	// Context toggle locale (always declare hook)
	const contextToggleLocale = useCallback(() => {
		if (context) {
			const newLocale = context.locale === 'en' ? 'fr' : 'en'
			context.setLocale(newLocale)
		}
	}, [context])

	// If context available (client-side), use it instead of local state
	if (context) {
		return {
			locale: context.locale,
			t: context.t,
			setLocale: context.setLocale,
			toggleLocale: contextToggleLocale,
			isLoading: false,
		}
	}

	return {
		locale,
		t,
		setLocale,
		toggleLocale,
		isLoading,
	}
}

// ====================================
// HOOK FOR SPECIFIC TRANSLATIONS
// ====================================

/**
 * Hook for getting a specific translation with caching
 * Useful when you only need one translation and want to optimize re-renders
 */
export function useTranslation(
	key: string,
	variables?: InterpolationVariables,
): { value: unknown; isLoading: boolean } {
	const { locale } = useI18n()
	const [value, setValue] = useState<unknown>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const t = createT(locale)
		const translation = variables ? t(key, variables) : t(key)
		setValue(translation)
		setIsLoading(false)
	}, [key, variables, locale])

	return {
		value: value!,
		isLoading,
	}
}

// ====================================
// HOOK FOR COMPLETE SECTIONS
// ====================================

/**
 * Hook for getting an entire section of translations
 * Useful for forms, lists, or components that need multiple related translations
 */
export function useTranslationSection(sectionKey: string): {
	section: unknown
	isLoading: boolean
} {
	const { locale } = useI18n()
	const [section, setSection] = useState<unknown>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const t = createT(locale)
		const sectionData = t(sectionKey)
		setSection(sectionData)
		setIsLoading(false)
	}, [sectionKey, locale])

	return {
		section: section!,
		isLoading,
	}
}

// ====================================
// HOOK FOR PREFERRED LOCALE
// ====================================

/**
 * Hook for managing user's preferred locale with persistence
 */
export function usePreferredLocale(): {
	preferredLocale: Locale | null
	setPreferredLocale: (locale: Locale) => void
	clearPreference: () => void
} {
	const [preferredLocale, setPreferredLocaleState] = useState<Locale | null>(
		null,
	)

	useEffect(() => {
		// Load from cookie on mount
		if (typeof window !== 'undefined') {
			getCookie(COOKIE_NAMES.LANG).then(stored => {
				if (stored) {
					setPreferredLocaleState(stored as Locale)
				}
			})
		}
	}, [])

	const setPreferredLocale = useCallback((locale: Locale) => {
		setPreferredLocaleState(locale)
		if (typeof window !== 'undefined') {
			// Set preference in cookie
			setCookie('preferred-locale', locale, {
				path: '/',
				maxAge: 365 * 24 * 60 * 60, // 1 year
				sameSite: 'lax',
			})
		}
	}, [])

	const clearPreference = useCallback(() => {
		setPreferredLocaleState(null)
		if (typeof window !== 'undefined') {
			// Note: removeCookie is async, we don't await here
			import('@/lib/cookies').then(({ removeCookie }) => {
				removeCookie(COOKIE_NAMES.LANG, { path: '/' })
			})
		}
	}, [])

	return {
		preferredLocale,
		setPreferredLocale,
		clearPreference,
	}
}

// ====================================
// UTILITAIRES
// ====================================

/**
 * Switch locale in a given path
 * /en/about → /fr/about when switching to 'fr'
 */
export function switchLocaleInPath(
	currentPath: string,
	newLocale: Locale,
): string {
	// Remove current locale prefix
	const pathWithoutLocale = currentPath.replace(/^\/(en|fr)(\/|$)/, '/')

	// Add new locale prefix
	return `/${newLocale}${pathWithoutLocale === '/' ? '/' : pathWithoutLocale}`
}

/**
 * Get current locale from window location (client-side only)
 */
export function getCurrentLocale(): Locale {
	if (typeof window === 'undefined') return 'en'
	return getLocaleFromPath(window.location.pathname)
}

// ====================================
// PROVIDER COMPONENT (optional)
// ====================================

/**
 * Context to share i18n state between components
 * Optional - hooks can work independently
 */

interface I18nContextType {
	locale: Locale
	t: TFunction
	setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({
	children,
	initialLocale,
}: PropsWithChildren<{
	initialLocale: Locale
}>): ReactNode {
	// Create standalone state for provider (not dependent on useI18n hook)
	const [locale, setLocaleState] = useState<Locale>(initialLocale)

	// Create t function for current locale
	const t = useMemo(() => createT(locale), [locale])

	// Update global locale when local state changes
	useEffect(() => {
		setGlobalLocale(locale)
	}, [locale])

	// Set locale with optional navigation
	const setLocale = useCallback(
		(newLocale: Locale, navigate = true) => {
			if (newLocale === locale) return

			setLocaleState(newLocale)

			// Store preference in cookie
			if (typeof window !== 'undefined') {
				setCookie(COOKIE_NAMES.LANG, newLocale, {
					path: '/',
					maxAge: 365 * 24 * 60 * 60, // 1 year
					sameSite: 'lax',
				})

				// Navigate to new locale if requested
				if (navigate) {
					const currentPath = window.location.pathname
					const newPath = switchLocaleInPath(currentPath, newLocale)
					if (newPath !== currentPath) {
						window.location.href = newPath
						return
					}
				}
			}
		},
		[locale],
	)

	const value = useMemo(
		() => ({
			locale,
			t,
			setLocale,
		}),
		[locale, t, setLocale],
	)

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// ====================================
// TYPES EXPORTS
// ====================================

export type { Locale, TFunction }
