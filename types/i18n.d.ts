// ====================================
// TYPE-SAFE I18N SYSTEM
// ====================================
// Consolidated i18n type definitions
// Auto-inferred type system from the English dictionary

import type { en } from '../src/i18n/locales/en'

// The English dictionary is the source of truth
export type EnglishDict = typeof en

// Base types
export type Locale = 'en' | 'fr'

// ====================================
// TYPES FOR DYNAMIC KEYS
// ====================================

// Type for interpolation variables
export interface InterpolationVariables {
	[key: string]: string | number | Date | boolean | undefined
}

// Type for keys with dynamic index (e.g., "plans.items.{index}.name")
export type DynamicKey = string

// Type for workflow step keys
export type StepKey =
	| 'discovery'
	| 'design'
	| 'development'
	| 'testing'
	| 'deployment'
	| 'support'

// Type for pricing plan keys - re-export from shared types
export type { Plan as PlanKey } from './plans'

// ====================================
// SIMPLE PATH EXTRACTOR - ACTUALLY WORKING VERSION
// ====================================

// Pragmatic approach: Use runtime typing, accept string keys
// Perfect compile-time typing for deeply nested structures is complex
// We prioritize runtime correctness and developer experience

// Accept any string as a translation key - this allows maximum flexibility
// while still providing typed return values through our Navigate system
export type TranslationKey = string

// ====================================
// SIMPLE PATH NAVIGATION - ACTUALLY WORKING VERSION
// ====================================

// Simple navigation using template literal types
export type Navigate<T, Path extends string> = Path extends keyof T
	? T[Path]
	: Path extends `${infer K}.${infer Rest}`
		? K extends keyof T
			? Navigate<T[K], Rest>
			: never
		: never

// ====================================
// SIMPLE RETURN TYPE FOR t() FUNCTION
// ====================================

// Return type of t() function based on the path - simple and working
export type TranslationReturn<K extends string> = K extends TranslationKey
	? Navigate<EnglishDict, K> extends infer Result
		? Result extends string
			? string
			: Result extends object
				? Readonly<Result>
				: unknown
		: unknown
	: unknown

// ====================================
// t() FUNCTION - OVERLOADED SIGNATURES
// ====================================

// Signature for exact keys without interpolation
export interface TFunction {
	// Most specific overloads first - static keys with known types
	<K extends TranslationKey>(key: K): TranslationReturn<K>
	<K extends TranslationKey>(
		key: K,
		variables: InterpolationVariables,
	): TranslationReturn<K> extends string ? string : TranslationReturn<K>
	// Generic overload for any string (includes dynamic keys)
	(key: string): unknown
	(key: string, variables: InterpolationVariables): unknown
}

// ====================================
// VALIDATION TYPES FOR DICTIONARIES
// ====================================

// Type to validate only the structure of other languages (not the content)
type ValidateStructure<Expected> = Expected extends string
	? string // Any string for translated values
	: Expected extends readonly (infer U)[]
		? readonly ValidateStructure<U>[] // Same array structure
		: Expected extends object
			? {
					readonly [K in keyof Expected]: ValidateStructure<
						Expected[K]
					>
				} // Same keys, translated values
			: Expected // Other types pass through as is

// Type for translated dictionary (used with satisfies)
export type TranslationDict = ValidateStructure<EnglishDict>

// ====================================
// INTERPOLATION UTILITIES
// ====================================

// Detect variables in a string (e.g., "Hello {name}")
export type ExtractVariables<T extends string> =
	T extends `${string}{${infer Var}}${infer Rest}`
		? Var | ExtractVariables<Rest>
		: never

// Type for required variables in a key
export type RequiredVariables<K extends TranslationKey> =
	Navigate<EnglishDict, K> extends string
		? ExtractVariables<Navigate<EnglishDict, K>>
		: never

// ====================================
// UTILITY TYPES FOR COMPONENTS
// ====================================

// Type-safe locale validation function type
export type LocaleGuard = (value: unknown) => value is Locale
