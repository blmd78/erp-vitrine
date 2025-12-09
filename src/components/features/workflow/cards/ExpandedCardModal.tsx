import React from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { useI18n } from '@/lib/i18n/I18nReact'

import { ModalBenefitsGrid } from '../expanded/ModalBenefitsGrid'
import { ModalDeliverablesList } from '../expanded/ModalDeliverablesList'
import { ModalHeroSection } from '../expanded/ModalHeroSection'
import { ModalOverviewPanel } from '../expanded/ModalOverviewPanel'

import type { ExpandedCardModalProps } from '@/types/workflow'

/**
 * ExpandedCardModal - Minimal clean modal
 *
 * Features:
 * - Hero section with illustration
 * - 2-column layout: Overview (40%) + Benefits (60%)
 * - Simple deliverables list
 * - Staggered animations
 * - Keyboard navigation (Esc to close)
 */
export const ExpandedCardModal = ({
	isOpen,
	onClose,
	stepData,
	stepKey,
}: ExpandedCardModalProps) => {
	const { t } = useI18n()
	const { accentColor, deliverables } = stepData

	// Close on Escape key + body scroll lock
	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		if (isOpen) {
			window.addEventListener('keydown', handleEscape)
			document.body.style.overflow = 'hidden'
		}
		return () => {
			window.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = ''
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<>
					{/* Simple Backdrop - Clean and Dark */}
					<motion.div
						className="fixed inset-0 z-50 bg-black/60"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Modal Container */}
					<motion.div
						className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[95vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
						onClick={e => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-title"
					>
						{/* Scrollable Content */}
						<div className="max-h-[90vh] overflow-y-auto">
							{/* Hero Section */}
							<ModalHeroSection
								title={stepData.title}
								description={stepData.shortDescription}
								accentColor={accentColor}
								stepKey={stepKey}
								onClose={onClose}
								closeLabel={t('workflow.modal.closeModal')}
							/>

							{/* Body Content */}
							<motion.div className="mx-auto max-w-5xl space-y-8 px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12">
								{/* 2-Column Layout: Overview (40%) + Benefits (60%) */}
								<div className="grid grid-cols-1 gap-8 md:grid-cols-5">
									{/* Overview - 40% */}
									<div className="md:col-span-2">
										<ModalOverviewPanel
											title={t('workflow.modal.overview')}
											description={
												stepData.fullDescription
											}
											accentColor={accentColor}
										/>
									</div>

									{/* Benefits - 60% */}
									{stepData.benefits.length > 0 && (
										<div className="md:col-span-3">
											<ModalBenefitsGrid
												title={t(
													'workflow.modal.keyBenefits',
												)}
												benefits={stepData.benefits}
												accentColor={accentColor}
											/>
										</div>
									)}
								</div>

								{/* Deliverables - Full Width */}
								{deliverables.length > 0 && (
									<ModalDeliverablesList
										title={t('workflow.modal.whatYouGet')}
										deliverables={deliverables}
										accentColor={accentColor}
									/>
								)}
							</motion.div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
