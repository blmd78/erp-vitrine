import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type React from 'react'

import { cn } from '@/lib/core/utils'

interface MobileAccordionSectionProps {
	readonly title: string
	readonly value: string
	readonly count?: number
	readonly children: React.ReactNode
	readonly accentColor: string
}

/**
 * MobileAccordionSection - Radix UI Accordion wrapper for mobile bottom sheet
 *
 * Features:
 * - 48px touch target height (WCAG AAA)
 * - Chevron rotation indicator
 * - Haptic feedback on toggle (iOS/Android)
 * - Single-open behavior (controlled by parent Accordion.Root)
 */
export const MobileAccordionSection = ({
	title,
	value,
	count,
	children,
	accentColor,
}: MobileAccordionSectionProps) => {
	const handleToggle = () => {
		// Haptic feedback on accordion toggle (5ms + 10ms pattern)
		if ('vibrate' in navigator) {
			navigator.vibrate([5, 10])
		}
	}

	return (
		<Accordion.Item value={value} className="border-b border-gray-200">
			<Accordion.Trigger
				className={cn(
					'group flex h-12 w-full items-center justify-between',
					'px-4',
					'text-left',
					'transition-colors',
					'hover:bg-gray-50',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
				)}
				style={
					{
						'--tw-ring-color': accentColor,
					} as React.CSSProperties
				}
				onClick={handleToggle}
			>
				{/* Title + Count */}
				<div className="flex items-center gap-2">
					<span
						className={cn(
							'font-semibold',
							'text-sm',
							'text-gray-900',
						)}
					>
						{title}
					</span>
					{count !== undefined && (
						<span
							className={cn(
								'flex h-5 w-5 items-center justify-center',
								'rounded-full',
								'text-[10px] font-bold',
								'bg-gray-100',
								'text-gray-600',
							)}
						>
							{count}
						</span>
					)}
				</div>

				{/* Chevron indicator */}
				<ChevronDown
					className={cn(
						'h-4 w-4 shrink-0',
						'text-gray-500',
						'transition-transform duration-200',
						'group-data-[state=open]:rotate-180',
					)}
					strokeWidth={2}
				/>
			</Accordion.Trigger>

			<Accordion.Content
				className={cn(
					'overflow-hidden',
					'data-[state=closed]:animate-accordion-up',
					'data-[state=open]:animate-accordion-down',
				)}
			>
				<div className="px-4 pt-2 pb-4">{children}</div>
			</Accordion.Content>
		</Accordion.Item>
	)
}
