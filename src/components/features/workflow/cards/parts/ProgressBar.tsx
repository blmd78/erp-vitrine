import { progressSegmentVariants } from './progress-bar-variants'

export interface ProgressBarProps {
	readonly currentStep: number
	readonly totalSteps?: number
}

// Progress bar segments (fixed array for stable keys)
const PROGRESS_SEGMENTS = [0, 1, 2, 3, 4, 5] as const

/**
 * ProgressBar - Mini horizontal segments showing workflow progress
 * Uses CVA variants with CSS custom properties from design system
 * Fixed height from grid custom property for alignment
 */
export const ProgressBar = ({
	currentStep,
	totalSteps = 6,
}: ProgressBarProps) => {
	return (
		<div
			className="flex h-[var(--card-progress-height)] items-center gap-1"
			role="progressbar"
			aria-valuenow={currentStep}
			aria-valuemin={1}
			aria-valuemax={totalSteps}
		>
			{PROGRESS_SEGMENTS.slice(0, totalSteps).map(segment => {
				const isFilled = segment < currentStep
				return (
					<div
						key={segment}
						className={progressSegmentVariants({
							variant: isFilled ? 'filled' : 'empty',
							step: isFilled
								? (currentStep as 1 | 2 | 3 | 4 | 5 | 6)
								: undefined,
						})}
					/>
				)
			})}
		</div>
	)
}
