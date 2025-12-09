/**
 * TransformationBeams Component Configuration
 *
 * Centralized configuration for the animated transformation beams
 * connecting tech stack to benefits.
 */

// ============================================================================
// BEAM STYLING DEFAULTS
// ============================================================================

/**
 * Default styling for beam paths
 */
export const BEAM_DEFAULTS = {
	/** Path color (visible line) */
	pathColor: 'rgb(203, 213, 225)',
	/** Path stroke width */
	pathWidth: 2,
	/** Path opacity */
	pathOpacity: 0.3,
} as const

// ============================================================================
// COLOR SCHEMES
// ============================================================================

/**
 * Gradient color schemes for beams
 */
export const BEAM_COLORS = {
	primary: {
		/** Blue to Green */
		start: '#3b82f6',
		end: '#22c55e',
	},
	reversed: {
		/** Green to Blue */
		start: '#22c55e',
		end: '#3b82f6',
	},
} as const

// ============================================================================
// BEAM DEFINITIONS
// ============================================================================

export type BeamColorScheme = keyof typeof BEAM_COLORS

export interface BeamConfig {
	id: string
	/** Curvature of the beam (-100 to 100) */
	curvature: number
	/** Animation duration in seconds */
	duration: number
	/** Animation delay in seconds */
	delay: number
	/** Color scheme to use */
	colorScheme: BeamColorScheme
}

/**
 * Configuration for all three animated beams
 */
export const BEAMS: BeamConfig[] = [
	{
		id: 'top',
		curvature: -60,
		duration: 4,
		delay: 0,
		colorScheme: 'primary',
	},
	{
		id: 'middle',
		curvature: -5,
		duration: 4.5,
		delay: 0.5,
		colorScheme: 'reversed',
	},
	{
		id: 'bottom',
		curvature: 60,
		duration: 4,
		delay: 1,
		colorScheme: 'primary',
	},
] as const
