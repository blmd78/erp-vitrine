import { cn } from '@/lib/core/utils'

/**
 * Reusable CSS patterns for marketing components
 * Following CLAUDE.md guidelines for UI constants
 *
 * These constants use the cn() utility to compose Tailwind classes
 * for consistent glassmorphic design patterns across the site.
 */

/**
 * Glassmorphic card patterns
 * Used across marketing sections for consistent visual design
 */
export const MARKETING_CARDS = {
	/**
	 * Standard glassmorphic container
	 * Usage: Hero sections, feature cards, content containers
	 */
	container: cn(
		'rounded-3xl p-8 sm:p-10',
		'bg-white/50 dark:bg-brand-charcoal/50',
		'backdrop-blur-sm',
		'border border-white/20',
	),

	/**
	 * Compact glassmorphic card
	 * Usage: Small feature cards, tech icons, badges
	 */
	compact: cn(
		'rounded-2xl p-6',
		'bg-white/80 dark:bg-brand-charcoal/80',
		'backdrop-blur-sm',
		'border-2 border-gray-200/50 dark:border-gray-700/50',
		'shadow-lg',
	),

	/**
	 * Interactive card with hover effects
	 * Usage: Clickable cards, bento grid items, portfolio items
	 */
	interactive: cn(
		'rounded-3xl p-6 sm:p-8',
		'bg-white/50 dark:bg-brand-charcoal/50',
		'backdrop-blur-sm',
		'border border-white/20',
		'cursor-pointer',
		'transition-all duration-300',
		'hover:bg-white/70 dark:hover:bg-brand-charcoal/70',
		'hover:shadow-xl',
		'hover:scale-[1.02]',
	),

	/**
	 * Badge/pill style
	 * Usage: Status badges, feature pills, tags
	 */
	badge: cn(
		'rounded-full px-3 py-1.5 sm:px-4 sm:py-2',
		'bg-white/80 dark:bg-brand-charcoal/80',
		'backdrop-blur-sm',
		'shadow-sm',
		'flex items-center gap-1.5 sm:gap-2',
	),
} as const

/**
 * Background gradient patterns
 * Used for section backgrounds and decorative elements
 */
export const MARKETING_GRADIENTS = {
	/**
	 * Primary brand gradient (blue to green)
	 * Usage: Hero sections, CTA sections
	 */
	primary: cn(
		'bg-gradient-to-br',
		'from-brand-blue via-brand-blue-muted to-brand-green-muted',
	),

	/**
	 * Soft background gradient
	 * Usage: Section backgrounds, alternating content areas
	 */
	soft: cn(
		'bg-gradient-to-br',
		'from-white via-brand-gray-soft to-brand-blue-light/30',
	),

	/**
	 * Overlay gradient (for text readability over images)
	 * Usage: Hero backgrounds, image overlays
	 */
	overlay: cn(
		'bg-gradient-to-br',
		'from-brand-blue/80 via-brand-blue-muted/70 to-brand-green-muted/75',
	),
} as const

/**
 * Text styling patterns
 * Consistent typography for marketing content
 */
export const MARKETING_TEXT = {
	/**
	 * Main hero title
	 * Usage: Page hero sections
	 */
	heroTitle: cn(
		'text-4xl font-bold',
		'sm:text-5xl',
		'md:text-6xl',
		'lg:text-7xl',
		'tracking-tight',
	),

	/**
	 * Section title
	 * Usage: Section headings
	 */
	sectionTitle: cn(
		'text-3xl font-bold',
		'sm:text-4xl',
		'md:text-5xl',
		'tracking-tight',
	),

	/**
	 * Subtitle/description
	 * Usage: Hero subtitles, section descriptions
	 */
	subtitle: cn(
		'text-base text-gray-600 dark:text-gray-300',
		'sm:text-lg',
		'md:text-xl',
		'leading-relaxed',
	),
} as const

/**
 * Spacing patterns
 * Consistent padding/margin for sections
 */
export const MARKETING_SPACING = {
	/**
	 * Standard section padding
	 * Usage: Most content sections
	 */
	section: cn('py-16 sm:py-20 lg:py-28'),

	/**
	 * Compact section padding
	 * Usage: Smaller sections, nested content
	 */
	sectionCompact: cn('py-12 sm:py-16 lg:py-20'),

	/**
	 * Container padding
	 * Usage: Content containers within sections
	 */
	container: cn('mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'),
} as const
