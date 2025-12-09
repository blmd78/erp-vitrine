import { useState } from 'react'

import {
	BarChart3,
	Gem,
	Globe,
	Lightbulb,
	Lock,
	RefreshCw,
	Rocket,
	Shield,
	ShieldCheck,
	Smartphone,
	Sparkles,
	Target,
	TrendingUp,
	Users,
	Wrench,
	Zap,
} from 'lucide-react'
import { motion } from 'motion/react'

interface Benefit {
	id?: string
	title: string
	description: string
	icon: string
}

interface ModalBenefitsGridProps {
	/** Section title (e.g., "Key Benefits") */
	title: string

	/** Array of benefits */
	benefits: readonly Benefit[]

	/** Accent color for visual elements */
	accentColor: string
}

// Icon mapping for Lucide icons
const ICONS = {
	Target,
	Shield,
	Lightbulb,
	Users,
	TrendingUp,
	Sparkles,
	Gem,
	Smartphone,
	Zap,
	Lock,
	Rocket,
	Wrench,
	Globe,
	BarChart3,
	ShieldCheck,
	RefreshCw,
} as const

/**
 * ModalBenefitsGrid - Minimal benefit cards
 *
 * Features:
 * - Clean cards with generous spacing
 * - Focus on typography
 * - Simple hover effects
 * - 2-column responsive grid
 */
export const ModalBenefitsGrid = ({
	title,
	benefits,
	accentColor,
}: ModalBenefitsGridProps) => {
	return (
		<motion.div className="space-y-4">
			{/* Section Header */}
			<div className="flex items-center gap-2.5">
				<Sparkles
					className="h-5 w-5"
					style={{ color: accentColor }}
					aria-hidden="true"
				/>
				<h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
					{title}
				</h3>
			</div>

			{/* Benefits Grid - 1 col on MD, 2 cols on LG+ */}
			<motion.div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{benefits.map(benefit => (
					<BenefitCard
						key={benefit.id || benefit.title}
						benefit={benefit}
						accentColor={accentColor}
					/>
				))}
			</motion.div>
		</motion.div>
	)
}

/**
 * Individual Benefit Card - Premium Design with Shimmer Effect
 */
const BenefitCard = ({
	benefit,
	accentColor,
}: {
	benefit: Benefit
	accentColor: string
}) => {
	const IconComponent = ICONS[benefit.icon as keyof typeof ICONS]
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div>
			<button
				type="button"
				className="shimmer-on-hover group relative h-full w-full space-y-4 overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50/50 p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				style={{
					borderColor: isHovered ? accentColor : 'rgb(229 231 235)',
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Floating Icon - Top Right */}
				<div
					className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
					style={{
						background: `radial-gradient(circle, ${accentColor}dd, ${accentColor}99)`,
					}}
				>
					{IconComponent && (
						<IconComponent
							className="h-5 w-5 text-white"
							aria-hidden="true"
						/>
					)}
				</div>

				{/* Content */}
				<div className="space-y-2 pr-14">
					{/* Title */}
					<h4 className="text-base font-bold tracking-tight text-gray-900">
						{benefit.title}
					</h4>

					{/* Description */}
					<p className="text-xs leading-relaxed text-gray-600">
						{benefit.description}
					</p>
				</div>
			</button>
		</motion.div>
	)
}
