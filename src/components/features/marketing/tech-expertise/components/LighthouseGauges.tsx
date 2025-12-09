import { getMetricColor } from '@/lib/config/metrics-config'

import MetricCard from './MetricCard'

interface LighthouseGaugesProps {
	readonly data: {
		readonly performance: string
		readonly seo: string
		readonly accessibility: string
		readonly bestPractices: string
		readonly pwa: string
		readonly details: readonly {
			readonly label: string
			readonly description: string
			readonly icon:
				| 'zap'
				| 'search'
				| 'eye'
				| 'shield-check'
				| 'smartphone'
		}[]
	}
}

/**
 * Lighthouse metrics display with animated gauges
 * Receives all data as a single prop for cleaner composition
 */
const LighthouseGauges = ({ data }: LighthouseGaugesProps) => {
	const values = [
		data.performance,
		data.seo,
		data.accessibility,
		data.bestPractices,
		data.pwa,
	]

	const metrics = data.details.map((detail, index) => ({
		...detail,
		value: values[index] || '0',
		color: getMetricColor(index),
	}))

	return (
		<div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			{metrics.map(metric => (
				<MetricCard
					key={metric.label}
					value={metric.value}
					label={metric.label}
					description={metric.description}
					color={metric.color}
				/>
			))}
		</div>
	)
}

export default LighthouseGauges
