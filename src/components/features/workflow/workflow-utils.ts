import { translateSteps } from '@/lib/i18n/translate-utils'

import { STEP_CONFIG, STEP_KEYS } from './workflow-constants'

import type { Step, StepConfig } from '@/types/workflow'

// Utility function to generate workflow steps with translations
export const generateWorkflowSteps = (): Step[] =>
	STEP_KEYS.map(key => {
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		const stepData = translateSteps(key)
		return {
			id: key,
			...stepData,
			icon: config.icon,
		}
	})

// Utility function to get step configuration by key
export const getStepConfig = (key: string): StepConfig => {
	const config = STEP_CONFIG[key]
	if (!config) {
		throw new Error(`Step config not found for key: ${key}`)
	}
	return config
}
