import { cva } from 'class-variance-authority'

/**
 * Progress segment variants using CVA
 * Uses CSS custom properties from design-tokens.css
 */
export const progressSegmentVariants = cva(
	// Base styles (always applied)
	['h-1 flex-1 rounded-full transition-all', 'md:h-1 lg:h-1.5'],
	{
		variants: {
			variant: {
				empty: 'bg-gray-400/30 ',
				filled: [
					'transition-all duration-200 ease-out',
					'hover:scale-y-125 hover:origin-bottom',
				],
			},
			step: {
				1: '',
				2: '',
				3: '',
				4: '',
				5: '',
				6: '',
			},
		},
		compoundVariants: [
			// Filled + step colors
			{
				variant: 'filled',
				step: 1,
				class: 'bg-[var(--step-1-primary)]',
			},
			{
				variant: 'filled',
				step: 2,
				class: 'bg-[var(--step-2-primary)]',
			},
			{
				variant: 'filled',
				step: 3,
				class: 'bg-[var(--step-3-primary)]',
			},
			{
				variant: 'filled',
				step: 4,
				class: 'bg-[var(--step-4-primary)]',
			},
			{
				variant: 'filled',
				step: 5,
				class: 'bg-[var(--step-5-primary)]',
			},
			{
				variant: 'filled',
				step: 6,
				class: 'bg-[var(--step-6-primary)]',
			},
		],
		defaultVariants: {
			variant: 'empty',
			step: 1,
		},
	},
)
