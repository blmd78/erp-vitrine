import { cva } from 'class-variance-authority'

export type stepCardIndex = 1 | 2 | 3 | 4 | 5 | 6

/**
 * StepCard variants using CVA
 * Uses CSS custom properties from design-tokens.css
 * Complies with Tailwind guidelines (CVA exception for component variants)
 */
export const stepCardVariants = cva(
	// Base styles (always applied)
	[
		// Glassmorphism
		'backdrop-blur-xl cursor-pointer',
		'bg-white/10 ',
		'rounded-2xl',
		'border',
		// Transitions
		'group transition-all duration-300 ease-out',
	],
	{
		variants: {
			step: {
				1: [
					// Border
					'border-[var(--step-1-border)]',
					// Shadow
					'shadow-[0_4px_10px_var(--shadow-indigo)]',
					'lg:shadow-[0_6px_16px_var(--shadow-indigo)]',
					// Hover
					'hover:border-[var(--step-1-glow)]',
					'hover:shadow-[0_6px_20px_var(--step-1-glow)]',
					'hover:bg-white/15',
				],
				2: [
					'border-[var(--step-2-border)]',
					'shadow-[0_4px_10px_var(--shadow-violet)]',
					'lg:shadow-[0_6px_16px_var(--shadow-violet)]',
					'hover:border-[var(--step-2-glow)]',
					'hover:shadow-[0_6px_20px_var(--step-2-glow)]',
					'hover:bg-white/15',
				],
				3: [
					'border-[var(--step-3-border)]',
					'shadow-[0_4px_10px_var(--shadow-emerald)]',
					'lg:shadow-[0_6px_16px_var(--shadow-emerald)]',
					'hover:border-[var(--step-3-glow)]',
					'hover:shadow-[0_6px_20px_var(--step-3-glow)]',
					'hover:bg-white/15',
				],
				4: [
					'border-[var(--step-4-border)]',
					'shadow-[0_4px_10px_var(--shadow-amber)]',
					'lg:shadow-[0_6px_16px_var(--shadow-amber)]',
					'hover:border-[var(--step-4-glow)]',
					'hover:shadow-[0_6px_20px_var(--step-4-glow)]',
					'hover:bg-white/15',
				],
				5: [
					'border-[var(--step-5-border)]',
					'shadow-[0_4px_10px_var(--shadow-rose)]',
					'lg:shadow-[0_6px_16px_var(--shadow-rose)]',
					'hover:border-[var(--step-5-glow)]',
					'hover:shadow-[0_6px_20px_var(--step-5-glow)]',
					'hover:bg-white/15',
				],
				6: [
					'border-[var(--step-6-border)]',
					'shadow-[0_4px_10px_var(--shadow-slate)]',
					'lg:shadow-[0_6px_16px_var(--shadow-slate)]',
					'hover:border-[var(--step-6-glow)]',
					'hover:shadow-[0_6px_20px_var(--step-6-glow)]',
					'hover:bg-white/15',
				],
			},
		},
		defaultVariants: {
			step: 1,
		},
	},
)

export type CardDirection = 'top' | 'left' | 'bottom' | 'right'

/**
 * Card direction variants for workflow alignment
 * Controls flex alignment based on where the workflow line connects
 * Uses h-full to fill SVG zone container
 */
export const stepCardDirection = cva('flex h-full w-full', {
	variants: {
		direction: {
			top: 'items-start justify-center', // Line arrives from top
			bottom: 'items-end justify-center', // Line arrives from bottom (ex: step 1)
			left: 'items-center justify-start', // Line arrives from left (ex: step 3)
			right: 'items-center justify-end', // Line arrives from right
		},
	},
	defaultVariants: {
		direction: 'bottom',
	},
})
