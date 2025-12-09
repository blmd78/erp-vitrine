import type { LucideIcon } from 'lucide-react'
import { Code, Rocket, Smartphone, Zap } from 'lucide-react'

import BentoCard from './BentoCard'
import CounterMetric from './CounterMetric'

interface BentoSEOProps {
	readonly title: string
	readonly score: string
	readonly label: string
	readonly metrics: readonly {
		readonly label: string
		readonly value: string
		readonly icon: 'zap' | 'smartphone' | 'code'
	}[]
}

// Local icon mapping for SEO metrics
const ICON_MAP: Record<string, LucideIcon> = {
	zap: Zap,
	smartphone: Smartphone,
	code: Code,
}

/**
 * SEO metrics section for Bento grid
 * Displays SEO score with supplementary metrics
 */
const BentoSEO = ({ title, score, label, metrics }: BentoSEOProps) => {
	return (
		<BentoCard>
			<div className="relative z-10">
				<div className="mb-6 flex items-center gap-3">
					<Rocket className="text-brand-green h-6 w-6" />
					<h3 className="text-xl font-bold text-white">{title}</h3>
				</div>
				<div className="mb-6">
					<CounterMetric value={score} label={label} />
				</div>
				<div className="border-brand-soft-black space-y-2 border-t pt-4">
					{metrics.map(metric => {
						const Icon = ICON_MAP[metric.icon] ?? Zap
						return (
							<div
								key={metric.label}
								className="flex items-center gap-2 text-sm"
							>
								<Icon className="text-brand-green h-4 w-4" />
								<span className="text-gray-400">
									{metric.label}
								</span>
								<span className="ml-auto font-semibold text-white">
									{metric.value}
								</span>
							</div>
						)
					})}
				</div>
			</div>
		</BentoCard>
	)
}

export default BentoSEO
