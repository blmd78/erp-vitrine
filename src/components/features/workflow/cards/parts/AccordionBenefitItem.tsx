import * as LucideIcons from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface AccordionBenefitItemProps {
	readonly title: string
	readonly description: string
	readonly icon: string
	readonly accentColor: string
	readonly index: number
}

/**
 * AccordionBenefitItem - Compact benefit card for mobile accordion
 *
 * Features:
 * - Icon + Title + Description in single column
 * - Stagger animation on reveal
 * - Accent color theming
 */
export const AccordionBenefitItem = ({
	title,
	description,
	icon,
	accentColor,
	index,
}: AccordionBenefitItemProps) => {
	// Dynamically get Lucide icon component
	// Icon names come from i18n data, so dynamic access is necessary
	// biome-ignore lint/performance/noDynamicNamespaceImportAccess: Dynamic icon mapping required for i18n
	const IconComponent = (LucideIcons[icon as keyof typeof LucideIcons] ||
		LucideIcons.Circle) as React.ComponentType<{
		className?: string
		style?: React.CSSProperties
		strokeWidth?: number
	}>

	return (
		<motion.div
			initial={{ opacity: 0, y: -8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.2,
				delay: index * 0.05, // 50ms stagger
			}}
			className={cn(
				'flex gap-3 p-3',
				'rounded-lg',
				'bg-gray-50',
				'border border-gray-200',
			)}
		>
			{/* Icon */}
			<div
				className={cn(
					'flex h-10 w-10 shrink-0 items-center justify-center',
					'rounded-lg',
					'bg-white',
					'shadow-sm',
				)}
				style={{
					borderColor: accentColor,
					borderWidth: '2px',
				}}
			>
				<IconComponent
					className="h-5 w-5"
					style={{ color: accentColor }}
					strokeWidth={2}
				/>
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1">
				<h4
					className={cn(
						'mb-1 font-semibold',
						'text-sm',
						'text-gray-900',
					)}
				>
					{title}
				</h4>
				<p className={cn('text-xs leading-relaxed', 'text-gray-600')}>
					{description}
				</p>
			</div>
		</motion.div>
	)
}
