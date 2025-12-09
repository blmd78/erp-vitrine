import { useEffect, useState } from 'react'

import {
	ORBIT_ANIMATION,
	ORBIT_EFFECTS,
	TECH_STACK,
} from '@/lib/config/marketing/orbiting-tech-config'

import SkillIcon from './SkillIcon'

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OrbitingTech() {
	const [time, setTime] = useState(0)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		if (isPaused) return

		let animationFrameId: number
		let lastTime = performance.now()

		const animate = (currentTime: number) => {
			const deltaTime = (currentTime - lastTime) / 1000
			lastTime = currentTime

			setTime(prevTime => prevTime + deltaTime)
			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [isPaused])

	const { base, hovered, secondary } = ORBIT_ANIMATION.centerEffect

	return (
		<div
			role="img"
			aria-label="Technology Stack Visualization"
			className="orbiting-tech-container relative flex min-h-[500px] items-center justify-center md:min-h-[450px] lg:min-h-[500px] xl:min-h-[550px]"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Center energy effect - multiple animated gradients */}
			<div
				className="animate-spin-slow absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-green-500 blur-3xl transition-all duration-500"
				style={{
					transform: isPaused
						? `translate(-50%, -50%) scale(${hovered.scale})`
						: `translate(-50%, -50%) scale(${base.scale})`,
					opacity: isPaused ? hovered.opacity : base.opacity,
				}}
			/>
			<div
				className="absolute top-1/2 left-1/2 h-18 w-18 animate-pulse rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 blur-2xl transition-all duration-500"
				style={{
					transform: isPaused
						? `translate(-50%, -50%) scale(${secondary.hovered.scale})`
						: `translate(-50%, -50%) scale(${secondary.base.scale})`,
					opacity: isPaused
						? secondary.hovered.opacity
						: secondary.base.opacity,
				}}
			/>

			{/* Orbit rings */}
			{[
				{ key: 'inner', var: 'var(--orbit-inner)' },
				{ key: 'middle', var: 'var(--orbit-middle)' },
				{ key: 'outer', var: 'var(--orbit-outer)' },
			].map(orbit => (
				<div
					key={orbit.key}
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${ORBIT_EFFECTS.border.orbit}`}
					style={{
						width: `calc(${orbit.var} * 2)`,
						height: `calc(${orbit.var} * 2)`,
					}}
				/>
			))}

			{/* Skills */}
			{TECH_STACK.map(config => {
				const angle = time * config.speed + config.phaseShift
				return (
					<SkillIcon
						key={config.id}
						config={config}
						angle={angle}
						isGlobalHovered={isPaused}
					/>
				)
			})}
		</div>
	)
}

// CSS for responsive orbit sizing
const styles = `
	.orbiting-tech-container {
		--orbit-inner: 40px;
		--orbit-middle: 90px;
		--orbit-outer: 135px;
		--icon-inner: 28px;
		--icon-middle: 26px;
		--icon-outer: 24px;
	}

	@media (min-width: 768px) and (max-width: 1279px) {
		.orbiting-tech-container {
			--orbit-inner: 45px;
			--orbit-middle: 105px;
			--orbit-outer: 155px;
			--icon-inner: 32px;
			--icon-middle: 30px;
			--icon-outer: 28px;
		}
	}

	@media (min-width: 1280px) {
		.orbiting-tech-container {
			--orbit-inner: 60px;
			--orbit-middle: 140px;
			--orbit-outer: 210px;
			--icon-inner: 44px;
			--icon-middle: 40px;
			--icon-outer: 36px;
		}
	}
`

if (typeof document !== 'undefined') {
	const styleSheet = document.createElement('style')
	styleSheet.textContent = styles
	document.head.appendChild(styleSheet)
}
