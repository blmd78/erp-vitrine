import {
	CARD_DIMENSIONS,
	DESKTOP_WORKFLOW_POSITIONS,
} from '../workflow-constants'

import type { WorkflowPosition } from '@/types/workflow'

export type WorkflowVariant = 'mini' | 'compact' | 'large'

// ViewBox dimensions - same as the working old version
export const VIEWBOX_WIDTH = 1000
export const VIEWBOX_HEIGHT = 500

/**
 * Calculate the correct rectangle position based on line direction and rectangle dimensions
 */
export function calculateRectPosition(
	position: WorkflowPosition,
	width: number,
	height: number,
): { x: number; y: number } {
	// Offset by half the rectangle's width and height to center it on the line endpoint
	const x = position.x - width / 2
	const y = position.y - height / 2

	// Clamp values to ensure the rectangle stays within bounds
	const clampedX = Math.max(0, Math.min(VIEWBOX_WIDTH - width, x))
	const clampedY = Math.max(0, Math.min(VIEWBOX_HEIGHT - height, y))

	return { x: clampedX, y: clampedY }
}

/**
 * Get positioning data for workflow components
 */
export function getWorkflowPositioning(): {
	positions: WorkflowPosition[]
	cardWidth: number
	cardHeight: number
	viewBox: { width: number; height: number }
} {
	const positions = DESKTOP_WORKFLOW_POSITIONS
	const { width: cardWidth, height: cardHeight } = CARD_DIMENSIONS

	return {
		positions,
		cardWidth,
		cardHeight,
		viewBox: {
			width: VIEWBOX_WIDTH,
			height: VIEWBOX_HEIGHT,
		},
	}
}

export interface StepPosition {
	x: number
	y: number
	stepIndex: number
	originalWorkflowPosition: WorkflowPosition
}

/**
 * Calculate positions for all step cards
 */
export function calculateStepPositions(): StepPosition[] {
	const { positions, cardWidth, cardHeight } = getWorkflowPositioning()

	return positions.map((position, index) => ({
		...calculateRectPosition(position, cardWidth, cardHeight),
		stepIndex: index,
		originalWorkflowPosition: position,
	}))
}
