// ====================================
// UNIFIED t() FUNCTION - I18N SYSTEM
// ====================================
// Single function that works client AND server side

import { en } from '../../i18n/locales/en'
import { fr } from '../../i18n/locales/fr'
import {
	createCacheKey,
	getNestedValue,
	interpolateString,
	isDynamicKey,
	resolveDynamicKey,
	warnMissingTranslation,
} from './utils'

import type {
	InterpolationVariables,
	Locale,
	TFunction,
	TranslationKey,
	TranslationReturn,
} from '@/types/i18n'

// ====================================
// DICTIONARIES AND CACHE
// ====================================

const dictionaries = {
	en,
	fr,
} as const

// Simple cache for translations
const translationCache = new Map<string, unknown>()

// ====================================
// MAIN t() FUNCTION
// ====================================

/**
 * Unified translation function that works client AND server side
 *
 * Usage examples:
 * - t('home.hero.title') → string
 * - t('home.hero') → readonly object with all translations under hero
 * - t('common.examples.messages.{index}', { index: 0 }) → dynamic key
 * - t('common.examples.interpolation.greeting', { name: 'John' }) → interpolation
 */
export function createT(locale: Locale): TFunction {
	const dictionary = dictionaries[locale]

	// Implementation function - core logic
	function getTranslation(
		key: string,
		variables?: InterpolationVariables,
	): unknown {
		// Cache handling
		const cacheKey = createCacheKey(locale, key, variables)
		if (translationCache.has(cacheKey)) {
			return translationCache.get(cacheKey)
		}

		let resolvedKey = key
		let result: unknown

		// Resolve dynamic keys if necessary
		if (isDynamicKey(key) && variables) {
			resolvedKey = resolveDynamicKey(key, variables)
		}

		// Get value from dictionary
		result = getNestedValue(dictionary, resolvedKey)

		// If not found, try with original key
		if (result === undefined && resolvedKey !== key) {
			result = getNestedValue(dictionary, key)
		}

		// If still not found, show warning and return key
		if (result === undefined) {
			warnMissingTranslation(key, locale)
			result = key
		}

		// Interpolation for strings
		if (typeof result === 'string' && variables) {
			result = interpolateString(result, variables)
		}

		// Cache and return
		translationCache.set(cacheKey, result)
		return result
	}

	// Return function that exactly matches TFunction interface
	function translatorFn<K extends TranslationKey>(
		key: K,
	): TranslationReturn<K>
	function translatorFn<K extends TranslationKey>(
		key: K,
		variables: InterpolationVariables,
	): TranslationReturn<K> extends string ? string : TranslationReturn<K>
	function translatorFn(key: string): unknown
	function translatorFn(
		key: string,
		variables: InterpolationVariables,
	): unknown
	function translatorFn(
		key: string,
		variables?: InterpolationVariables,
	): unknown {
		return getTranslation(key, variables)
	}

	return translatorFn
}

// ====================================
// DEFAULT GLOBAL FUNCTION
// ====================================

// Global t() function that uses default locale
// This variable will be reassigned by middleware based on active locale
export let globalT: TFunction = createT('en')

/**
 * Update global t() function with new locale
 * Used by Astro middleware
 */
export function setGlobalLocale(locale: Locale): void {
	globalT = createT(locale)
}

/**
 * Global t() function - uses current locale defined by middleware
 * Can be used anywhere in the application
 */
export function t<K extends TranslationKey>(key: K): TranslationReturn<K>
export function t<K extends TranslationKey>(
	key: K,
	variables: InterpolationVariables,
): TranslationReturn<K> extends string ? string : TranslationReturn<K>
export function t(key: string): unknown
export function t(key: string, variables: InterpolationVariables): unknown
export function t(key: string, variables?: InterpolationVariables): unknown {
	if (variables) {
		return globalT(key, variables)
	}
	return globalT(key)
}

// ====================================
// EXPORTS
// ====================================

export type { TFunction, TranslationKey, Locale, InterpolationVariables }

// Re-export utilities for advanced usage
export {
	getNestedValue,
	interpolateString,
	isDynamicKey,
	resolveDynamicKey,
} from './utils'
