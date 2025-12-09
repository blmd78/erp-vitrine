import * as React from 'react'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import type { ComponentRef } from 'react'

import { cn } from '@/lib/core/utils'

interface ProgressProps
	extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
	indicatorClassName?: string
	'aria-label'?: string
}

const Progress = React.forwardRef<
	ComponentRef<typeof ProgressPrimitive.Root>,
	ProgressProps
>(({ className, value, indicatorClassName, style, ...props }, ref) => {
	const progressColor =
		style?.['--progress-color' as keyof React.CSSProperties]

	return (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn(
				'bg-brand-soft-black relative h-2 w-full overflow-hidden rounded-full',
				className,
			)}
			aria-label={props['aria-label'] || 'Progress'}
			{...props}
		>
			<ProgressPrimitive.Indicator
				className={cn(
					'h-full w-full flex-1 transition-all duration-1000 ease-out',
					progressColor
						? ''
						: 'from-brand-blue to-brand-green bg-gradient-to-r',
					indicatorClassName,
				)}
				style={{
					transform: `translateX(-${100 - (value || 0)}%)`,
					backgroundColor: progressColor as string | undefined,
				}}
			/>
		</ProgressPrimitive.Root>
	)
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
