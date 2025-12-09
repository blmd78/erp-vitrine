/**
 * TechTransformation Animation Configuration
 *
 * Centralized animation timing and values for hover effects.
 * Note: Fade-in animations have been removed per user request.
 */

// ============================================================================
// ANIMATION DURATIONS (milliseconds)
// ============================================================================

/**
 * Duration values for animations in the section
 */
export const ANIMATION_DURATIONS = {
	/** Icon pulse effect */
	iconPulse: 2000,
	/** Background gradient shifting */
	gradientShift: 8000,
	/** Hover state transitions */
	hover: 300,
	/** Long hover transitions */
	hoverLong: 500,
} as const

// ============================================================================
// HOVER TRANSFORMATIONS
// ============================================================================

/**
 * Transform values for hover states
 */
export const HOVER_TRANSFORMS = {
	card: {
		/** Regular card lift */
		translateY: -4,
		/** Regular card scale */
		scale: 1.03,
	},
	heroCard: {
		/** Hero card scale (no translateY) */
		scale: 1.02,
	},
} as const

// ============================================================================
// GRADIENT ANIMATION CONFIGURATION
// ============================================================================

/**
 * Configuration for animated gradients
 */
export const GRADIENT_ANIMATION = {
	/** Background size for animated gradients */
	backgroundSize: '200% 200%',
	/** Hero gradient color stops */
	heroStops: {
		0: 'from-brand-blue/30',
		50: 'via-brand-green/30',
		100: 'to-brand-blue/30',
	},
} as const

// ============================================================================
// DECORATIVE ELEMENTS CONFIGURATION
// ============================================================================

/**
 * Configuration for decorative background elements
 */
export const DECORATIVE_CONFIG = {
	blobs: {
		green: {
			classes:
				'bg-brand-green-soft/20 dark:bg-brand-green-soft/30 absolute top-20 right-10 h-96 w-96 animate-pulse rounded-full opacity-40 blur-3xl',
			delay: 0,
		},
		blue: {
			classes:
				'bg-brand-blue-soft/20 dark:bg-brand-blue-soft/30 absolute bottom-20 left-10 h-96 w-96 animate-pulse rounded-full opacity-40 blur-3xl',
			delay: 2000,
		},
	},
} as const
