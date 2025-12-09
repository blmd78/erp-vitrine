import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

import { CARD_FEATURES } from '../workflow-constants'
import { ProgressBar } from './parts/ProgressBar'
import type { stepCardIndex } from './step-card-variants'
import { stepCardVariants } from './step-card-variants'

export interface StepCardProps {
	readonly stepKey: string
	readonly index: number
	readonly number: string
	readonly title: string
	readonly description: string
	readonly stepLabel: string
	readonly onExpand?: () => void
}

/**
 * StepCard - Modern glassmorphic card with Design System colors
 * Uses layoutId for smooth morph animation to centered modal
 * Single responsive render with Tailwind breakpoint classes + scale strategy
 */
const StepCard = ({
	stepKey,
	stepLabel,
	index,
	title,
	description,
	onExpand,
}: StepCardProps) => {
	// Use centralized feature flags
	const { showDescription } = CARD_FEATURES

	// Calculate step number (1-6) for variants
	const stepNumber = (index + 1) as stepCardIndex

	// Handle card click to expand
	const handleCardClick = () => {
		if (onExpand) {
			onExpand()
		}
	}

	return (
		<motion.div
			layoutId={`card-${stepKey}`}
			className={stepCardVariants({ step: stepNumber })}
			data-step-card
			data-step-index={index}
			onClick={handleCardClick}
		>
			{/* Content container */}
			<div className="relative flex h-full flex-col p-4 md:p-3 lg:p-4">
				{/* Title */}
				<h1
					className={cn(
						'mb-2 leading-tight font-semibold',
						'text-gray-900',
						'text-sm md:text-xs lg:text-sm',
					)}
				>
					{title}
				</h1>

				<h3
					className={cn(
						'mb-1 font-bold',
						'text-muted-foreground',
						'text-sm md:text-xs',
					)}
				>
					{`${stepLabel} ${stepNumber}`}
				</h3>

				{/* Progress bar */}
				<div className="mb-2">
					<ProgressBar currentStep={stepNumber} totalSteps={6} />
				</div>

				{/* Description */}
				{showDescription && (
					<div className="flex-1 md:hidden lg:block">
						<p
							className={cn(
								'text-[11px] leading-relaxed',
								'text-gray-600',
								'line-clamp-3',
							)}
						>
							{description}
						</p>
					</div>
				)}
			</div>
		</motion.div>
	)
}

export default StepCard
