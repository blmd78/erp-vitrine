import { Zap } from 'lucide-react'

import BentoCard from './BentoCard'
import PerformanceMetrics from './PerformanceMetrics'

interface BentoPerformanceMetricsProps {
	readonly title: string
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
 * Performance metrics section for Bento grid
 * Displays performance indicators with grade and badge
 */
const BentoPerformanceMetrics = ({
	title,
	data,
}: BentoPerformanceMetricsProps) => {
	return (
		<BentoCard>
			<div className="relative z-10">
				<div className="mb-6 flex items-center gap-3">
					<Zap className="text-brand-green h-6 w-6" />
					<h3 className="text-xl font-bold text-white">{title}</h3>
				</div>
				<PerformanceMetrics data={data} />
			</div>
		</BentoCard>
	)
}

export default BentoPerformanceMetrics
