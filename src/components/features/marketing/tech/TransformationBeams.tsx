'use client'

import { useEffect, useRef, useState } from 'react'

import { AnimatedBeam } from '@/components/ui/animated-beam'
import {
	BEAM_COLORS,
	BEAM_DEFAULTS,
	BEAMS,
} from '@/lib/config/marketing/transformation-beams-config'

export const TransformationBeams = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isMobile, setIsMobile] = useState(false)

	// Detect screen size for orientation
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768) // md breakpoint
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Create refs directly for each beam (3 beams total)
	const startRef1 = useRef<HTMLDivElement>(null)
	const startRef2 = useRef<HTMLDivElement>(null)
	const startRef3 = useRef<HTMLDivElement>(null)
	const endRef1 = useRef<HTMLDivElement>(null)
	const endRef2 = useRef<HTMLDivElement>(null)
	const endRef3 = useRef<HTMLDivElement>(null)

	const startRefs = [startRef1, startRef2, startRef3]
	const endRefs = [endRef1, endRef2, endRef3]

	return (
		<div
			ref={containerRef}
			className={`relative flex h-full w-full ${
				isMobile
					? 'flex-col items-center justify-between'
					: 'flex-row items-center justify-between'
			}`}
		>
			{/* Start anchor points (top in mobile, left in desktop) */}
			<div
				className={
					isMobile
						? '-mt-3 flex w-full flex-row justify-around'
						: '-ml-3 flex h-full flex-col justify-around'
				}
			>
				{BEAMS.map((beam, i) => (
					<div
						key={`start-${beam.id}`}
						ref={startRefs[i]}
						className="h-2 w-2"
					/>
				))}
			</div>

			{/* End anchor points (bottom in mobile, right in desktop) */}
			<div
				className={
					isMobile
						? '-mb-3 flex w-full flex-row justify-around'
						: '-mr-3 flex h-full flex-col justify-around'
				}
			>
				{BEAMS.map((beam, i) => (
					<div
						key={`end-${beam.id}`}
						ref={endRefs[i]}
						className="h-2 w-2"
					/>
				))}
			</div>

			{/* Animated Beams */}
			{BEAMS.map((beam, index) => {
				const colors = BEAM_COLORS[beam.colorScheme]
				const fromRef = startRefs[index]
				const toRef = endRefs[index]

				if (!fromRef || !toRef) return null

				return (
					<AnimatedBeam
						key={beam.id}
						containerRef={containerRef}
						fromRef={fromRef}
						toRef={toRef}
						curvature={beam.curvature}
						duration={beam.duration}
						delay={beam.delay}
						pathColor={BEAM_DEFAULTS.pathColor}
						pathWidth={BEAM_DEFAULTS.pathWidth}
						pathOpacity={BEAM_DEFAULTS.pathOpacity}
						gradientStartColor={colors.start}
						gradientStopColor={colors.end}
						forceVertical={isMobile}
					/>
				)
			})}
		</div>
	)
}
