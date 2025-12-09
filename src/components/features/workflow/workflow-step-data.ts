import { translateSteps } from '@/lib/i18n/translate-utils'

import { STEP_COLORS, STEP_KEYS } from './workflow-constants'

import type { StepKey } from '@/types/i18n'
import type { WorkflowStepData } from '@/types/workflow'

/**
 * Rich workflow step data for expanded modal views
 * Now using i18n translations - only non-translatable data (colors, gradients, icons, links) defined here
 */

// CTA link mapping (non-translatable data)
const CTA_LINKS: Record<StepKey, string> = {
	discovery: '/contact',
	design: '/portfolio',
	development: '/how-we-work',
	testing: '/how-we-work',
	deployment: '/how-we-work',
	support: '/contact',
}

// Icon mapping (non-translatable data)
const STEP_ICONS: Record<StepKey, string> = {
	discovery: '🔍',
	design: '🎨',
	development: '⚡',
	testing: '🧪',
	deployment: '🚀',
	support: '🛠️',
}

/**
 * Get workflow step data with i18n translations
 */
export const getWorkflowStepData = (stepKey: StepKey): WorkflowStepData => {
	const stepTranslations = translateSteps(stepKey)
	const index = STEP_KEYS.indexOf(stepKey)
	const color = STEP_COLORS[index]

	if (!color) {
		throw new Error(`No color found for step ${stepKey} at index ${index}`)
	}

	return {
		id: stepKey,
		title: stepTranslations.title,
		shortDescription: stepTranslations.description,
		icon: STEP_ICONS[stepKey],
		fullDescription: stepTranslations.fullDescription,
		benefits: stepTranslations.benefits,
		deliverables: stepTranslations.deliverables,
		timeline: stepTranslations.timeline,
		gradient: `bg-step-${index + 1}` as const,
		accentColor: color,
		ctaText: stepTranslations.ctaText,
		ctaLink: CTA_LINKS[stepKey],
	}
}

/**
 * Legacy constant for backward compatibility (now dynamically generated from i18n)
 */
export const WORKFLOW_STEP_DATA: Record<StepKey, WorkflowStepData> =
	STEP_KEYS.reduce(
		(acc, stepKey) => {
			acc[stepKey] = getWorkflowStepData(stepKey)
			return acc
		},
		{} as Record<StepKey, WorkflowStepData>,
	)

/**
 * Get all workflow step data in order
 */
export const getAllWorkflowStepData = (): WorkflowStepData[] => {
	return STEP_KEYS.map(key => getWorkflowStepData(key))
}
