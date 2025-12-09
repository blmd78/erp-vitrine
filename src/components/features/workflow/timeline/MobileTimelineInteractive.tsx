import { useEffect, useRef, useState } from 'react'

import type React from 'react'

import { ExpandedCardBottomSheet } from '../cards/ExpandedCardBottomSheet'
import { STEP_KEYS } from '../workflow-constants'
import { getWorkflowStepData } from '../workflow-step-data'

import type { StepKey } from '@/types/i18n'

interface MobileTimelineInteractiveProps {
	readonly children: React.ReactNode
}

/**
 * MobileTimelineInteractive - Wrapper that adds interactivity to Astro-rendered MobileTimeline
 *
 * Pattern: Event Delegation
 * - Listens for clicks on parent container
 * - Uses data-step-index to identify which card was clicked
 * - Manages modal state and renders ExpandedCardBottomSheet
 *
 * Why this pattern?
 * - Keeps MobileTimeline.astro pure and server-rendered (fast, SEO-friendly)
 * - Only modal component is client-side hydrated (small JS bundle)
 * - No need for dangerouslySetInnerHTML or converting Astro to React
 */
export const MobileTimelineInteractive = ({
	children,
}: MobileTimelineInteractiveProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

	// Event delegation: listen for clicks on child cards
	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const handleClick = (event: MouseEvent) => {
			// Find closest card element with data-step-index
			const target = event.target as HTMLElement
			const cardElement = target.closest(
				'[data-step-card]',
			) as HTMLElement

			if (cardElement && cardElement.dataset.stepIndex !== undefined) {
				const index = Number.parseInt(cardElement.dataset.stepIndex, 10)
				setExpandedIndex(index)
			}
		}

		// Attach event listener to container (event delegation)
		container.addEventListener('click', handleClick)

		// Cleanup on unmount
		return () => {
			container.removeEventListener('click', handleClick)
		}
	}, [])

	const handleCollapse = () => {
		setExpandedIndex(null)
	}

	return (
		<>
			{/* Wrapper div for event delegation */}
			<div ref={containerRef}>{children}</div>

			{/* Bottom Sheet - only rendered when a card is clicked */}
			{expandedIndex !== null && (
				<ExpandedCardBottomSheet
					isOpen={expandedIndex !== null}
					onClose={handleCollapse}
					stepData={getWorkflowStepData(
						STEP_KEYS[expandedIndex] as StepKey,
					)}
					stepKey={STEP_KEYS[expandedIndex] as StepKey}
				/>
			)}
		</>
	)
}
