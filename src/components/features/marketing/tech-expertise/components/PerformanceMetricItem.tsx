import type { LucideIcon } from 'lucide-react'
import { Activity, Eye, Gauge, MousePointer, Package, Zap } from 'lucide-react'

import { cn } from '@/lib/core/utils'

interface PerformanceMetricItemProps {
	readonly metric: {
		readonly label: string
		readonly value: string
		readonly description: string
		readonly icon: string
		readonly unit: string
	}
	readonly color: string
}

// Local icon mapping for performance metrics
const ICON_MAP: Record<string, LucideIcon> = {
	eye: Eye,
	zap: Zap,
	'mouse-pointer': MousePointer,
	activity: Activity,
	gauge: Gauge,
	package: Package,
}

/**
 * Individual performance metric item with icon and value
 */
const PerformanceMetricItem = ({
	metric,
	color,
}: PerformanceMetricItemProps) => {
	const numericValue = Number.parseFloat(metric.value)
	// const displayValue = useCounterAnimation({ targetValue: numericValue, isVisible, delay: index * 100 }) // Animation removed
	const displayValue = numericValue // Show final value directly

	// Format display value to match original precision
	const formattedValue =
		numericValue % 1 === 0
			? displayValue.toString()
			: displayValue.toFixed(1)

	return (
		<div
			className={cn(
				'flex flex-col gap-2 rounded-lg p-3',
				'from-brand-charcoal/30 to-brand-soft-black/30 bg-gradient-to-br',
				'border-brand-soft-black border',
				'hover:border-brand-green/30 transition-all duration-300',
			)}
		>
			{/* Icon and Label */}
			<div className="flex items-center gap-2">
				{(() => {
					const Icon = ICON_MAP[metric.icon] ?? Zap
					return <Icon className="h-5 w-5" style={{ color }} />
				})()}
				<span className="text-xs font-semibold text-gray-300">
					{metric.label}
				</span>
			</div>

			{/* Value */}
			<div className="flex items-baseline gap-1">
				<span
					className="text-2xl font-bold text-white tabular-nums"
					style={{ color }}
				>
					{formattedValue}
				</span>
				<span className="text-xs text-gray-400">{metric.unit}</span>
			</div>

			{/* Description */}
			<p className="text-[10px] leading-tight text-gray-500">
				{metric.description}
			</p>
		</div>
	)
}

export default PerformanceMetricItem
