import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/I18nReact'

interface DragHandleProps {
	readonly className?: string
}

/**
 * DragHandle - Visual affordance for draggable bottom sheet
 *
 * Features:
 * - 48x24px touch target (WCAG AAA)
 * - Centered horizontal bar indicator
 * - Haptic feedback on touch (iOS/Android)
 * - Internationalized aria-label for accessibility
 */
export const DragHandle = ({ className }: DragHandleProps) => {
	const { t } = useI18n()
	const handleTouchStart = () => {
		// Haptic feedback on drag start (10ms vibration)
		if ('vibrate' in navigator) {
			navigator.vibrate(10)
		}
	}

	return (
		<div
			className={cn(
				'flex h-6 w-full items-center justify-center',
				'cursor-grab active:cursor-grabbing',
				className,
			)}
			onTouchStart={handleTouchStart}
			aria-label={t('workflow.modal.dragHandle')}
			role="presentation"
		>
			{/* Visual indicator bar */}
			<div
				className={cn(
					'h-1 w-12 rounded-full',
					'bg-gray-300',
					'transition-colors duration-200',
					'hover:bg-gray-400',
				)}
			/>
		</div>
	)
}
