import { cn } from '@/lib/core/utils'

interface CounterMetricProps {
	readonly value: string
	readonly label: string
}

/**
 * Counter metric display
 * Displays the final value directly
 */
const CounterMetric = ({ value, label }: CounterMetricProps) => {
	const numValue = value.match(/\d+/)
	const targetValue = numValue ? Number.parseInt(numValue[0], 10) : 0
	// const displayCount = useCounterAnimation({ targetValue, isVisible, delay }) // Animation removed
	const displayCount = targetValue // Show final value directly without animation

	const displayValue = value.replace(/\d+/, displayCount.toString())

	return (
		<div className="text-center">
			<div
				className={cn(
					'text-3xl font-bold sm:text-4xl',
					'from-brand-blue to-brand-green bg-gradient-to-r',
					'bg-clip-text text-transparent',
				)}
			>
				{displayValue}
			</div>
			<p className="mt-2 text-sm text-gray-400">{label}</p>
		</div>
	)
}

export default CounterMetric
