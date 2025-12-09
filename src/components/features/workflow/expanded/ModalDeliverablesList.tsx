import type { LucideIcon } from 'lucide-react'
import { Cloud, FileCode, Package, Palette } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface Deliverable {
	name: string
	description: string
	type: string
}

interface ModalDeliverablesListProps {
	/** Section title (e.g., "What You Get") */
	title: string

	/** Array of deliverables */
	deliverables: readonly Deliverable[]

	/** Accent color for visual elements */
	accentColor: string
}

const TYPE_ICON_MAP: Record<string, LucideIcon> = {
	document: FileCode,
	code: FileCode,
	asset: Palette,
	service: Cloud,
}

const getDeliverableIcon = (type: string): LucideIcon => {
	return TYPE_ICON_MAP[type] ?? Package
}

/**
 * ModalDeliverablesList - Compact pill cards
 *
 * Features:
 * - Horizontal pill-style cards
 * - Icon + badge + name in elegant layout
 * - Subtle backgrounds with hover effects
 */
export const ModalDeliverablesList = ({
	title,
	deliverables,
	accentColor,
}: ModalDeliverablesListProps) => {
	return (
		<motion.div className="space-y-4">
			{/* Section Header */}
			<div className="flex items-center gap-2.5">
				<Package
					className="h-5 w-5"
					style={{ color: accentColor }}
					aria-hidden="true"
				/>
				<h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
					{title}
				</h3>
			</div>

			{/* Compact Pill Cards Grid */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{deliverables.map(deliverable => {
					const Icon = getDeliverableIcon(deliverable.type)
					return (
						<div
							key={deliverable.name}
							className="group flex items-center gap-3 rounded-lg border border-gray-200/50 bg-gray-50/80 px-3 py-2.5 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
							style={{
								borderLeftWidth: '3px',
								borderLeftColor: accentColor,
							}}
						>
							{/* Badge with icon */}
							<span
								className={cn(
									'flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium',
								)}
								style={{
									backgroundColor: `${accentColor}10`,
									color: accentColor,
								}}
							>
								<Icon className="h-3 w-3" aria-hidden="true" />
								<span className="capitalize">
									{deliverable.type}
								</span>
							</span>

							{/* Name */}
							<span className="text-sm font-semibold text-gray-900">
								{deliverable.name}
							</span>
						</div>
					)
				})}
			</div>
		</motion.div>
	)
}
