import { Check, FileText } from 'lucide-react'
import { motion } from 'motion/react'

interface ModalOverviewPanelProps {
	/** Section title (e.g., "Overview") */
	title: string

	/** Full description content (format: "Intro sentence. • Point 1 • Point 2") */
	description: string

	/** Accent color for visual elements */
	accentColor: string
}

/**
 * ModalOverviewPanel - Minimal overview section
 *
 * Features:
 * - Clean typography with icon
 * - Parses description into intro + bullet points
 * - Compact spacing with visual hierarchy
 */
export const ModalOverviewPanel = ({
	title,
	description,
	accentColor,
}: ModalOverviewPanelProps) => {
	// Parse description: split by • to separate intro from bullet points
	const parts = description.split('•').map(part => part.trim())
	const intro = parts[0]
	const bulletPoints = parts.slice(1).filter(point => point.length > 0)

	return (
		<motion.div className="space-y-3">
			{/* Section Header */}
			<div className="flex items-center gap-2.5">
				<FileText
					className="h-5 w-5"
					style={{ color: accentColor }}
					aria-hidden="true"
				/>
				<h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
					{title}
				</h3>
			</div>

			{/* Intro Sentence */}
			<p className="text-xs leading-relaxed font-medium text-gray-900 sm:text-sm">
				{intro}
			</p>

			{/* Bullet Points */}
			{bulletPoints.length > 0 && (
				<ul className="space-y-1.5">
					{bulletPoints.map(point => (
						<li
							key={point}
							className="flex items-start gap-2 text-xs leading-relaxed text-gray-700 sm:text-sm"
						>
							<Check
								className="mt-0.5 h-3.5 w-3.5 shrink-0"
								style={{ color: accentColor }}
								aria-hidden="true"
							/>
							<span>{point}</span>
						</li>
					))}
				</ul>
			)}
		</motion.div>
	)
}
