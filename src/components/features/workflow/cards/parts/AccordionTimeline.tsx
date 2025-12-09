import { CheckCircle2, Clock } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface AccordionTimelineProps {
	readonly duration: string
	readonly milestones: readonly string[]
	readonly accentColor: string
}

/**
 * AccordionTimeline - Timeline section for mobile accordion
 *
 * Features:
 * - Duration display with clock icon
 * - Milestone list with checkmarks
 * - Stagger animation on reveal
 */
export const AccordionTimeline = ({
	duration,
	milestones,
	accentColor,
}: AccordionTimelineProps) => {
	return (
		<div className="space-y-4">
			{/* Duration */}
			<motion.div
				initial={{ opacity: 0, y: -8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2 }}
				className={cn(
					'flex items-center gap-2 p-3',
					'rounded-lg',
					'bg-gray-50',
					'border border-gray-200',
				)}
			>
				<Clock
					className="h-5 w-5 shrink-0"
					style={{ color: accentColor }}
					strokeWidth={2}
				/>
				<span
					className={cn('font-semibold', 'text-sm', 'text-gray-900')}
				>
					{duration}
				</span>
			</motion.div>

			{/* Milestones */}
			<div className="space-y-2">
				{milestones.map((milestone, index) => (
					<motion.div
						key={`milestone-${milestone.substring(0, 20)}-${index}`}
						initial={{ opacity: 0, x: -8 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.2,
							delay: (index + 1) * 0.05, // Start after duration (50ms stagger)
						}}
						className="flex items-start gap-2"
					>
						<CheckCircle2
							className="mt-0.5 h-4 w-4 shrink-0"
							style={{ color: accentColor }}
							strokeWidth={2}
						/>
						<span
							className={cn(
								'text-xs leading-relaxed',
								'text-gray-700',
							)}
						>
							{milestone}
						</span>
					</motion.div>
				))}
			</div>
		</div>
	)
}
