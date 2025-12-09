import type { LucideIcon } from 'lucide-react'
import { Activity, CheckCircle, Lock, Shield } from 'lucide-react'

import { cn } from '@/lib/core/utils'

import BentoCard from './BentoCard'

interface BentoQualityBadgesProps {
	readonly data: {
		readonly title: string
		readonly items: readonly {
			readonly title: string
			readonly subtitle: string
			readonly icon: 'shield' | 'check' | 'activity' | 'lock'
		}[]
	}
}

// Local icon mapping for quality badges
const ICON_MAP: Record<string, LucideIcon> = {
	shield: Shield,
	check: CheckCircle,
	activity: Activity,
	lock: Lock,
}

/**
 * Quality badges section for Bento grid
 * Displays quality metrics with icons
 */
const BentoQualityBadges = ({ data }: BentoQualityBadgesProps) => {
	return (
		<BentoCard className="lg:col-span-2">
			<div className="relative z-10">
				<div className="mb-6 flex items-center gap-3">
					<Shield className="text-brand-blue h-6 w-6" />
					<h3 className="text-xl font-bold text-white">
						{data.title}
					</h3>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					{data.items.map(badge => {
						const Icon = ICON_MAP[badge.icon] ?? Shield
						return (
							<div
								key={badge.subtitle}
								className={cn(
									'flex flex-col items-center gap-2 rounded-lg p-4',
									'from-brand-green/10 to-brand-blue/10 bg-gradient-to-br',
									'border-brand-green/30 border',
									'hover:border-brand-green/50 transition-colors',
								)}
							>
								<div className="flex items-center gap-2">
									<Icon className="text-brand-green h-5 w-5" />
									<span className="text-lg font-bold text-white">
										{badge.title}
									</span>
								</div>
								<span className="text-xs text-gray-400">
									{badge.subtitle}
								</span>
							</div>
						)
					})}
				</div>
			</div>
		</BentoCard>
	)
}

export default BentoQualityBadges
