import type { LucideIcon } from 'lucide-react'
import {
	CheckCircle2,
	Code2,
	Headphones,
	Palette,
	Rocket,
	Search,
} from 'lucide-react'

import type { StepKey } from '@/types/i18n'

interface StepIllustrationProps {
	stepKey: StepKey
	color?: string
	className?: string
}

const STEP_ICONS: Record<StepKey, LucideIcon> = {
	discovery: Search,
	design: Palette,
	development: Code2,
	testing: CheckCircle2,
	deployment: Rocket,
	support: Headphones,
} as const

export const StepIllustration = ({
	stepKey,
	color,
	className = 'h-full w-full',
}: StepIllustrationProps) => {
	const Icon = STEP_ICONS[stepKey]
	return <Icon className={className} strokeWidth={1.5} style={{ color }} />
}
