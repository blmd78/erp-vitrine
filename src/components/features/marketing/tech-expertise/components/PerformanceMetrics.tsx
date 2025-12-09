import { Zap } from 'lucide-react'

import { getMetricColor } from '@/lib/config/metrics-config'

import PerformanceMetricItem from './PerformanceMetricItem'

interface PerformanceMetricsProps {
	readonly data: {
		readonly subtitle: string
		readonly grade: string
		readonly badge: string
		readonly metrics: readonly {
			readonly label: string
			readonly value: string
			readonly description: string
			readonly icon: string
			readonly unit: string
		}[]
	}
}

/**
 * Performance metrics section with grade display and metric grid
 */
const PerformanceMetrics = ({ data }: PerformanceMetricsProps) => {
	return (
		<div className="flex flex-col gap-6">
			{/* Subtitle and Grade */}
			<div className="flex items-center justify-between">
				<p className="text-xs text-gray-400">{data.subtitle}</p>
				<div className="from-brand-blue to-brand-green rounded-md bg-gradient-to-r px-3 py-1">
					<span className="text-sm font-bold text-white">
						{data.grade}
					</span>
				</div>
			</div>

			{/* Metrics Grid */}
			<div className="grid grid-cols-2 gap-3">
				{data.metrics.map((metric, index) => (
					<PerformanceMetricItem
						key={metric.label}
						metric={metric}
						color={getMetricColor(index)}
					/>
				))}
			</div>

			{/* Performance Badge */}
			<div className="bg-brand-green/10 flex items-center justify-center gap-2 rounded-lg px-4 py-2">
				<Zap className="text-brand-green h-4 w-4" />
				<span className="text-brand-green text-xs font-medium">
					{data.badge}
				</span>
			</div>
		</div>
	)
}

export default PerformanceMetrics
