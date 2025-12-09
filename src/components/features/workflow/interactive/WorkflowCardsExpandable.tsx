import { useState } from 'react'

import { cn } from '@/lib/core/utils'
import { translateSteps } from '@/lib/i18n/translate-utils'

import { ExpandedCardModal } from '../cards/ExpandedCardModal'
import StepCard from '../cards/StepCard'
import { stepCardDirection } from '../cards/step-card-variants'
import { STEP_DIRECTIONS, STEP_KEYS } from '../workflow-constants'
import { getWorkflowStepData } from '../workflow-step-data'

import type { StepKey } from '@/types/i18n'

interface WorkflowCardsExpandableProps {
	readonly stepLabel: string
	readonly positions?: ReadonlyArray<{
		x: number
		y: number
		width: number
		height: number
	}>
}

/**
 * WorkflowCardsExpandable - Orchestrates expandable workflow cards
 * Manages global state: only one card can be expanded at a time
 *
 * Following SOLID principles:
 * - Single Responsibility: Only manages expansion state
 * - Open/Closed: Extensible via props without modification
 * - Dependency Inversion: Uses StepCard abstraction
 */
const WorkflowCardsExpandable = ({
	stepLabel,
	positions,
}: WorkflowCardsExpandableProps) => {
	// State: index of the currently expanded card (null if none)
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

	return (
		<>
			{STEP_KEYS.map((stepKey, index) => {
				const step = translateSteps(stepKey as StepKey)
				const position = positions?.[index]

				return (
					<div
						key={stepKey}
						className="animate-fade-in-card absolute"
						style={
							position
								? {
										left: `${position.x}%`,
										top: `${position.y}%`,
										width: `${position.width}%`,
										height: `${position.height}%`,
										animationDelay: `${index * 150}ms`,
									}
								: undefined
						}
					>
						<div
							className={cn(
								stepCardDirection({
									direction: STEP_DIRECTIONS[index],
								}),
								'step-card-wrapper',
							)}
						>
							<StepCard
								stepKey={stepKey}
								index={index}
								number={step.number}
								title={step.title}
								description={step.description}
								stepLabel={stepLabel}
								onExpand={() => setExpandedIndex(index)}
							/>
						</div>
					</div>
				)
			})}

			{/* Expanded Card Modal */}
			{expandedIndex !== null && (
				<ExpandedCardModal
					isOpen={expandedIndex !== null}
					onClose={() => setExpandedIndex(null)}
					stepData={getWorkflowStepData(
						STEP_KEYS[expandedIndex] as StepKey,
					)}
					stepKey={STEP_KEYS[expandedIndex] as StepKey}
				/>
			)}
		</>
	)
}

export default WorkflowCardsExpandable
