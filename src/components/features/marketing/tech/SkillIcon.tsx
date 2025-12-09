import { memo } from 'react'

import {
	ORBIT_ANIMATION,
	ORBIT_CONFIG,
	ORBIT_EFFECTS,
} from '@/lib/config/marketing/orbiting-tech-config'
import { cn } from '@/lib/core/utils'

import type { TechConfig } from '@/lib/config/marketing/orbiting-tech-config'

// ============================================================================
// MAPPING OBJECTS - Replaces nested ternaries
// ============================================================================

/**
 * Maps orbit radius values to CSS custom property variables
 */
const ORBIT_VARIABLE_MAP: Record<number, string> = {
	[ORBIT_CONFIG.radii.inner]: 'var(--orbit-inner)',
	[ORBIT_CONFIG.radii.middle]: 'var(--orbit-middle)',
	[ORBIT_CONFIG.radii.outer]: 'var(--orbit-outer)',
}

/**
 * Maps icon size values to CSS custom property variables
 */
const SIZE_VARIABLE_MAP: Record<number, string> = {
	[ORBIT_CONFIG.sizes.inner]: 'var(--icon-inner)',
	[ORBIT_CONFIG.sizes.middle]: 'var(--icon-middle)',
	[ORBIT_CONFIG.sizes.outer]: 'var(--icon-outer)',
}

// ============================================================================
// TYPES
// ============================================================================

interface SkillIconProps {
	config: TechConfig
	angle: number
	isGlobalHovered: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

const SkillIcon = memo(({ config, angle, isGlobalHovered }: SkillIconProps) => {
	// Use CSS custom properties for responsive orbit sizing via mapping
	const orbitVar = ORBIT_VARIABLE_MAP[config.orbitRadius]
	const sizeVar = SIZE_VARIABLE_MAP[config.size]

	const { Icon } = config
	const globalScale = isGlobalHovered ? ORBIT_ANIMATION.hover.globalScale : 1

	return (
		<div
			style={{
				transform: `translate(calc(-50% + ${Math.cos(angle)} * ${orbitVar}), calc(-50% + ${Math.sin(angle)} * ${orbitVar}))`,
				width: sizeVar,
				height: sizeVar,
			}}
			className="group absolute top-1/2 left-1/2 cursor-pointer"
		>
			{/* Global hover scale wrapper */}
			<div
				style={{
					transform: `scale(${globalScale})`,
				}}
				className={`h-full w-full transition-transform ${ORBIT_ANIMATION.transitions.default}`}
			>
				{/* Icon card */}
				<div
					className={cn(
						'relative flex h-full w-full items-center justify-center',
						'rounded-2xl border-2 bg-white/80 shadow-lg backdrop-blur-sm',
						'transition-all',
						ORBIT_ANIMATION.transitions.hover,
						'group-hover:-translate-y-2 group-hover:shadow-2xl',
						`group-hover:scale-[${ORBIT_ANIMATION.hover.iconScale}]`,
						ORBIT_EFFECTS.border.default,
					)}
					style={{
						boxShadow: `${ORBIT_EFFECTS.shadow.base} ${config.color}33`,
					}}
				>
					<Icon
						className="h-3/5 w-3/5"
						style={{ color: config.color }}
					/>

					{/* Hover glow effect */}
					<div
						className={`absolute inset-0 rounded-2xl opacity-${ORBIT_EFFECTS.glow.opacity.base} ${ORBIT_EFFECTS.glow.blur} transition-opacity ${ORBIT_ANIMATION.transitions.hover} group-hover:opacity-${ORBIT_EFFECTS.glow.opacity.hover}`}
						style={{
							background: `radial-gradient(circle, ${config.color}66 0%, transparent 70%)`,
						}}
					/>

					{/* Enhanced glow for global hover */}
					{isGlobalHovered && (
						<div
							className={`absolute inset-0 rounded-2xl opacity-${ORBIT_EFFECTS.glow.opacity.globalHover} ${ORBIT_EFFECTS.glow.blur}`}
							style={{
								background: `radial-gradient(circle, ${config.color}66 0%, transparent 70%)`,
							}}
						/>
					)}
				</div>
			</div>

			{/* Tooltip */}
			<div className={ORBIT_EFFECTS.tooltip.classes}>{config.label}</div>
		</div>
	)
})

SkillIcon.displayName = 'SkillIcon'

export default SkillIcon
