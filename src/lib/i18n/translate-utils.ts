// ====================================
// I18N UTILITY FUNCTIONS
// ====================================
// Type-safe utility functions for complex translation patterns
// This avoids the complexity of template string type inference at runtime

import { globalT } from './index'

import type { EnglishDict, StepKey } from '@/types/i18n'
import type { Plan } from '@/types/plans'

/**
 * Utility function for translating step objects with proper typing
 * Usage: translateSteps('discovery') → Readonly<{title, number, description, etc.}>
 */
export function translateSteps<K extends StepKey>(
	stepKey: K,
): Readonly<EnglishDict['workflow']['steps'][K]> {
	// Template string keys can't be statically typed, so cast is necessary
	const result = globalT(`workflow.steps.${stepKey}`)
	return result as Readonly<EnglishDict['workflow']['steps'][K]>
}

/**
 * Utility function for translating pricing plan objects with proper typing
 * Usage: translatePlan('starter') → Readonly<{name, tagline, price, features, etc.}>
 */
export function translatePlan<K extends Plan>(
	planKey: K,
): Readonly<EnglishDict['pricing']['plans'][K]> {
	// Template string keys can't be statically typed, so cast is necessary
	const result = globalT(`pricing.plans.${planKey}`)
	return result as Readonly<EnglishDict['pricing']['plans'][K]>
}
