import { Gauge } from 'lucide-react'

import BentoCard from './BentoCard'
import LighthouseGauges from './LighthouseGauges'

interface BentoLighthouseProps {
	readonly title: string
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
 * Lighthouse metrics section for Bento grid
 * Displays Lighthouse scores with animated gauges
 */
const BentoLighthouse = ({ title, data }: BentoLighthouseProps) => {
	return (
		<BentoCard className="lg:col-span-2">
			<div className="relative z-10">
				<div className="mb-6 flex items-center gap-3">
					<Gauge className="text-brand-green h-6 w-6" />
					<h3 className="text-xl font-bold text-white">{title}</h3>
				</div>
				<LighthouseGauges data={data} />
			</div>
		</BentoCard>
	)
}

export default BentoLighthouse
