import { cn } from '@/lib/core/utils'

interface BentoCardProps {
	readonly children: React.ReactNode
	readonly className?: string
}

/**
 * Reusable card component for bento grid layout
 * Includes hover effects and gradient backgrounds
 */
const BentoCard = ({ children, className }: BentoCardProps) => {
	return (
		<div
			className={cn(
				'group relative overflow-hidden rounded-2xl',
				'from-brand-charcoal/50 to-brand-soft-black/50 bg-gradient-to-br',
				'border-brand-soft-black border',
				'hover:border-brand-green/50 p-6 transition-all duration-300',
				'hover:shadow-brand-green/10 hover:shadow-xl',
				'cursor-pointer backdrop-blur-sm',
				className,
			)}
		>
			{children}
			<div
				className={cn(
					'absolute inset-0 rounded-2xl opacity-0',
					'from-brand-blue/10 to-brand-green/10 bg-gradient-to-br',
					'blur-xl transition-opacity duration-500 group-hover:opacity-100',
				)}
			/>
		</div>
	)
}

export default BentoCard
