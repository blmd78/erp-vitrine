// Centralized types for the workflow system
// Single source of truth for all workflow-related types

import type { EnglishDict, StepKey } from './i18n'

export interface StepConfig {
	icon: string
	color: string
}

export interface WorkflowPosition {
	x: number
	y: number
	lineEndX: number
	lineEndY: number
}

export interface GradientStop {
	offset: string
	color: string
	opacity: string
}

// Step type derived DIRECTLY from i18n data - DRY and KISS
export type Step = {
	id: StepKey
	icon: string
} & EnglishDict['workflow']['steps'][keyof EnglishDict['workflow']['steps']]

// Rich step data for expanded modal view
export interface WorkflowStepData {
	// Basic info (for card preview)
	id: StepKey
	title: string
	shortDescription: string
	icon: string

	// Extended info (for modal)
	fullDescription: string
	benefits: ReadonlyArray<{
		readonly id?: string
		readonly title: string
		readonly description: string
		readonly icon: string
	}>
	deliverables: ReadonlyArray<{
		readonly name: string
		readonly description: string
		readonly type: 'document' | 'code' | 'asset' | 'service'
	}>
	timeline: {
		readonly duration: string
		readonly milestones: readonly string[]
	}

	// Visual
	gradient: string
	accentColor: string

	// CTA
	ctaText?: string
	ctaLink?: string
}

// Types pour les composants de modal
export interface StepModalProps {
	isOpen: boolean
	onClose: () => void
	step: Step
	color: string
}

// Expanded modal component props
export interface ExpandedCardModalProps {
	isOpen: boolean
	onClose: () => void
	stepData: WorkflowStepData
	stepKey: StepKey
}

// Types pour les composants interactifs
export interface WorkflowJourneyInteractiveProps {
	steps: Step[]
	colors: readonly string[]
}

// Types pour les utilitaires de style
export interface GlassmorphicStyle {
	background: string
	backdropFilter: string
	WebkitBackdropFilter: string
	boxShadow?: string
}

export interface ModalOverlayStyle {
	background: string
}

// Types pour les hooks
export interface UseWorkflowModalReturn {
	openModalIndex: number | null
	openModal: (index: number) => void
	closeModal: () => void
}

export interface UseWorkflowInteractionReturn {
	initializeCardListeners: () => void
	cleanup: () => void
}
