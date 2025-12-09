import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/core/utils'

interface MetricCardProps {
	readonly value: string
	readonly label: string
	readonly description: string
	readonly color: string
}

/**
 * Individual metric card with progress bar
 */
const MetricCard = ({ value, label, description, color }: MetricCardProps) => {
	const numericValue = Number.parseInt(value, 10)
	// const displayValue = useCounterAnimation({ targetValue: numericValue, isVisible, delay }) // Animation removed
	const displayValue = numericValue // Show final value directly

	return (
		<div
			className={cn(
				'flex h-full flex-col justify-between gap-3 rounded-xl p-4',
				'from-brand-charcoal/50 to-brand-soft-black/50 bg-gradient-to-br',
				'border-brand-soft-black border',
				'hover:border-brand-green/50 transition-all duration-300',
				'hover:shadow-brand-green/10 hover:shadow-xl',
				'relative overflow-hidden',
			)}
		>
			{/* Colored Accent Bar */}
			<div
				className="absolute top-0 bottom-0 left-0 w-1 rounded-l-xl"
				style={{
					backgroundColor: color,
					boxShadow: `0 0 8px ${color}60`,
				}}
			/>

			{/* Title and Score Row */}
			<div className="flex items-start justify-between">
				<div className="flex-1 pr-3">
					<div className="text-base font-bold text-white">
						{label}
					</div>
					<div className="text-xs text-gray-400">{description}</div>
				</div>
				<div
					className="min-w-14 shrink-0 text-right text-2xl font-bold tabular-nums"
					style={{ color }}
				>
					{displayValue}
				</div>
			</div>

			{/* Progress Bar */}
			<div className="w-full">
				<Progress
					value={numericValue}
					aria-label={`${label}: ${displayValue}%`}
					className="h-2"
					style={
						{
							'--progress-color': color,
						} as React.CSSProperties
					}
				/>
			</div>

			{/* Hover Glow Effect */}
			<div
				className={cn(
					'absolute inset-0 rounded-xl opacity-0',
					'from-brand-blue/5 to-brand-green/5 bg-gradient-to-br',
					'blur-xl transition-opacity duration-500 group-hover:opacity-100',
				)}
			/>
		</div>
	)
}

export default MetricCard
