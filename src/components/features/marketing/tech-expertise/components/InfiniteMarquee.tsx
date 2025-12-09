import { cn } from '@/lib/core/utils'

interface InfiniteMarqueeProps {
	readonly items: readonly string[]
}

// Reusable badge indicator component
const MarqueeBadge = () => (
	<div className="bg-brand-green/20 h-1.5 w-1.5 rounded-full" />
)

/**
 * Static grid display component for items
 * Displays items in a responsive grid layout
 */
const InfiniteMarquee = ({ items }: InfiniteMarqueeProps) => {
	return (
		<div className="w-full">
			{/* Static grid layout */}
			<div className="flex flex-wrap justify-center gap-3">
				{items.map((item, idx) => (
					<div
						key={`${item}-${idx}`}
						className={cn(
							'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2',
							'from-brand-blue/10 to-brand-green/10 bg-gradient-to-r',
							'border-brand-blue/20 border',
							'text-sm whitespace-nowrap text-white',
							'hover:border-brand-green/40 transition-all duration-300',
						)}
					>
						<MarqueeBadge />
						{item}
					</div>
				))}
			</div>
		</div>
	)
}

export default InfiniteMarquee
