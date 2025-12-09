import { Code, FileText, Image, Server } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface AccordionDeliverableItemProps {
	readonly name: string
	readonly description: string
	readonly type: 'document' | 'code' | 'asset' | 'service'
	readonly accentColor: string
	readonly index: number
}

/**
 * AccordionDeliverableItem - Compact deliverable card for mobile accordion
 *
 * Features:
 * - Type badge + Name + Description in single column
 * - Type-specific icons (document, code, asset, service)
 * - Stagger animation on reveal
 */
export const AccordionDeliverableItem = ({
	name,
	description,
	type,
	accentColor,
	index,
}: AccordionDeliverableItemProps) => {
	// Map deliverable type to icon and label
	const typeConfig = {
		document: { icon: FileText, label: 'Document' },
		code: { icon: Code, label: 'Code' },
		asset: { icon: Image, label: 'Asset' },
		service: { icon: Server, label: 'Service' },
	}

	const { icon: IconComponent, label: typeLabel } = typeConfig[type]

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
			{/* Type Icon */}
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
				{/* Type badge + Name */}
				<div className="mb-1 flex items-center gap-2">
					<span
						className={cn(
							'rounded px-1.5 py-0.5',
							'text-[10px] font-medium tracking-wide uppercase',
							'bg-gray-200',
							'text-gray-700',
						)}
					>
						{typeLabel}
					</span>
					<h4
						className={cn(
							'font-semibold',
							'text-sm',
							'text-gray-900',
							'truncate',
						)}
					>
						{name}
					</h4>
				</div>

				<p className={cn('text-xs leading-relaxed', 'text-gray-600')}>
					{description}
				</p>
			</div>
		</motion.div>
	)
}
