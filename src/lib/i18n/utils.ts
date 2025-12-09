// ====================================
// UTILITIES FOR I18N SYSTEM
// ====================================

import { i18nLogger } from '../logging'

import type {
	DynamicKey,
	InterpolationVariables,
	TranslationKey,
} from '@/types/i18n'

// ====================================
// VARIABLE INTERPOLATION
// ====================================

/**
 * Interpolate variables in a translation string
 * Example: interpolateString("Hello {name}!", { name: "World" }) → "Hello World!"
 */
export function interpolateString(
	text: string,
	variables?: InterpolationVariables,
): string {
	if (!variables) return text

	return text.replace(/\{([^}]+)\}/g, (match, key) => {
		const value = variables[key]
		if (value === undefined || value === null) {
			i18nLogger.warn('Missing interpolation variable', {
				scope: 'variable-interpolation',
				details: { key, text },
			})
			return match // Return placeholder if variable doesn't exist
		}

		// Handle different types
		if (value instanceof Date) {
			return value.toLocaleDateString()
		}

		return String(value)
	})
}

// ====================================
// OBJECT NAVIGATION
// ====================================

/**
 * Check if a value can be navigated as an array
 */
function canNavigateAsArray(value: unknown): value is unknown[] {
	return typeof value === 'object' && Array.isArray(value)
}

/**
 * Check if a value can be navigated as an object
 */
function canNavigateAsObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Navigate array by index key
 */
function navigateArray(array: unknown[], key: string): unknown {
	const index = Number.parseInt(key, 10)
	if (!Number.isNaN(index) && index >= 0 && index < array.length) {
		return array[index]
	}
	return undefined
}

/**
 * Navigate object by property key
 */
function navigateObject(obj: Record<string, unknown>, key: string): unknown {
	return obj[key]
}

/**
 * Get a value in a nested object via dot-notation path
 * Example: getNestedValue(obj, "home.hero.title")
 */
export function getNestedValue<T = unknown>(
	obj: Record<string, unknown>,
	path: string,
): T | undefined {
	if (!obj || !path) return undefined

	const keys = path.split('.')
	let current: unknown = obj

	for (const key of keys) {
		if (current === null || current === undefined) {
			return undefined
		}

		if (canNavigateAsArray(current)) {
			current = navigateArray(current, key)
		} else if (canNavigateAsObject(current)) {
			current = navigateObject(current, key)
		} else {
			return undefined
		}

		if (current === undefined) {
			return undefined
		}
	}

	return current as T
}

// ====================================
// DYNAMIC KEY HANDLING
// ====================================

/**
 * Resolve dynamic keys by replacing placeholders
 * Example: resolveDynamicKey("plans.items.{index}.name", { index: 0 })
 * → "plans.items.0.name"
 */
export function resolveDynamicKey(
	key: DynamicKey,
	variables?: InterpolationVariables,
): string {
	if (!variables) return key

	return key.replace(/\{([^}]+)\}/g, (match, placeholder) => {
		const value = variables[placeholder]
		if (value === undefined || value === null) {
			i18nLogger.warn('Missing dynamic key variable', {
				scope: 'dynamic-key-resolution',
				details: { placeholder, key },
			})
			return match
		}
		return String(value)
	})
}

// ====================================
// KEY VALIDATION
// ====================================

/**
 * Check if a key is a valid translation key
 */
export function isValidTranslationKey(key: string): key is TranslationKey {
	// This function will be used at runtime to validate keys
	// In development, TypeScript will give us compilation errors
	return typeof key === 'string' && key.length > 0
}

/**
 * Check if a key contains dynamic placeholders
 */
export function isDynamicKey(key: string): boolean {
	return /\{[^}]+\}/.test(key)
}

// ====================================
// CACHE UTILITIES
// ====================================

/**
 * Create a unique cache key for a translation
 */
export function createCacheKey(
	locale: string,
	key: string,
	variables?: InterpolationVariables,
): string {
	const variablesHash = variables
		? JSON.stringify(variables, Object.keys(variables).sort())
		: ''
	return `${locale}:${key}:${variablesHash}`
}

// ====================================
// DEVELOPMENT UTILITIES
// ====================================

/**
 * Display a warning if a translation is missing
 */
export function warnMissingTranslation(key: string, locale: string): void {
	if (process.env.NODE_ENV === 'development') {
		i18nLogger.warn('Missing translation', {
			scope: 'translation-missing',
			details: { key, locale },
		})
	}
}

/**
 * Display a warning for missing interpolation variables
 */
export function warnMissingVariable(variable: string, key: string): void {
	if (process.env.NODE_ENV === 'development') {
		i18nLogger.warn('Missing variable for interpolation', {
			scope: 'variable-missing',
			details: { variable, key },
		})
	}
}
