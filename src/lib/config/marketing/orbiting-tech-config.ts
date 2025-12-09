/**
 * OrbitingTech Component Configuration
 *
 * Centralized configuration for the orbiting technologies visualization.
 * All visual effects, animations, and tech stack data are defined here
 * for easy customization and maintenance.
 */

import type { LucideIcon } from 'lucide-react'
import {
	Atom,
	Blocks,
	Cloud,
	Code2,
	Container,
	Database,
	GitBranch,
	Layers,
	Package,
	Server,
	Train,
	Workflow,
	Zap,
} from 'lucide-react'

// ============================================================================
// ORBIT CONFIGURATION
// ============================================================================

/**
 * Orbit radii define the distance from center for each orbit ring
 */
export const ORBIT_CONFIG = {
	radii: {
		inner: 60,
		middle: 140,
		outer: 210,
	},
	sizes: {
		inner: 44,
		middle: 40,
		outer: 36,
	},
	speeds: {
		inner: 0.5,
		middle: -0.35,
		outer: 0.25,
	},
} as const

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/**
 * Animation values for hover effects and transitions
 */
export const ORBIT_ANIMATION = {
	hover: {
		/** Global scale applied to all icons when hovering container */
		globalScale: 1.15,
		/** Individual icon scale on hover */
		iconScale: 1.18,
		/** Icon lift on hover (pixels) */
		translateY: -8,
	},
	transitions: {
		/** Default transition for scale effects */
		default: 'duration-300 ease-out',
		/** Transition for hover states */
		hover: 'duration-300',
	},
	centerEffect: {
		/** Base state for center energy effect */
		base: {
			scale: 1,
			opacity: 0.08,
		},
		/** Hovered state for center energy effect */
		hovered: {
			scale: 1.4,
			opacity: 0.15,
		},
		/** Secondary pulse effect */
		secondary: {
			base: { scale: 1, opacity: 0.15 },
			hovered: { scale: 1.6, opacity: 0.05 },
		},
	},
} as const

// ============================================================================
// VISUAL EFFECTS CONFIGURATION
// ============================================================================

/**
 * Visual effects like shadows, glows, and borders
 */
export const ORBIT_EFFECTS = {
	shadow: {
		/** Base shadow for icons */
		base: '0 0 20px',
		/** Enhanced shadow on hover */
		hover: '0 20px 40px -10px rgba(59, 130, 246, 0.3)',
	},
	glow: {
		opacity: {
			base: 0,
			hover: 1,
			globalHover: 0.8,
		},
		blur: 'blur-xl',
	},
	border: {
		default: 'border-gray-200/50 dark:border-gray-700/50',
		orbit: 'border-gray-300/60 dark:border-gray-600/60',
	},
	tooltip: {
		offset: '-bottom-8',
		classes:
			'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-900/90 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-100/90 dark:text-gray-900',
	},
} as const

// ============================================================================
// TECHNOLOGY STACK DATA
// ============================================================================

export type TechName =
	| 'react'
	| 'typescript'
	| 'tailwind'
	| 'astro'
	| 'nextjs'
	| 'nodejs'
	| 'graphql'
	| 'postgresql'
	| 'aws'
	| 'docker'
	| 'railway'
	| 'github'
	| 'redis'
	| 'mongodb'

export interface TechConfig {
	id: string
	orbitRadius: number
	size: number
	speed: number
	techName: TechName
	phaseShift: number
	label: string
	Icon: LucideIcon
	color: string
}

/**
 * Complete technology stack configuration
 * Organized by orbit (inner = most important, outer = infrastructure)
 */
export const TECH_STACK: TechConfig[] = [
	// =========================================================================
	// INNER ORBIT - Core Technologies (Most Important)
	// =========================================================================
	{
		id: 'react',
		orbitRadius: ORBIT_CONFIG.radii.inner,
		size: ORBIT_CONFIG.sizes.inner,
		speed: ORBIT_CONFIG.speeds.inner,
		techName: 'react',
		phaseShift: 0,
		label: 'React',
		Icon: Atom,
		color: '#61DAFB',
	},
	{
		id: 'typescript',
		orbitRadius: ORBIT_CONFIG.radii.inner,
		size: ORBIT_CONFIG.sizes.inner,
		speed: ORBIT_CONFIG.speeds.inner,
		techName: 'typescript',
		phaseShift: Math.PI / 2,
		label: 'TypeScript',
		Icon: Code2,
		color: '#3178C6',
	},
	{
		id: 'tailwind',
		orbitRadius: ORBIT_CONFIG.radii.inner,
		size: ORBIT_CONFIG.sizes.inner,
		speed: ORBIT_CONFIG.speeds.inner,
		techName: 'tailwind',
		phaseShift: Math.PI,
		label: 'Tailwind',
		Icon: Zap,
		color: '#06B6D4',
	},
	{
		id: 'astro',
		orbitRadius: ORBIT_CONFIG.radii.inner,
		size: ORBIT_CONFIG.sizes.inner,
		speed: ORBIT_CONFIG.speeds.inner,
		techName: 'astro',
		phaseShift: (3 * Math.PI) / 2,
		label: 'Astro',
		Icon: Layers,
		color: '#FF5D01',
	},

	// =========================================================================
	// MIDDLE ORBIT - Backend & APIs (Medium Importance)
	// =========================================================================
	{
		id: 'nextjs',
		orbitRadius: ORBIT_CONFIG.radii.middle,
		size: ORBIT_CONFIG.sizes.middle,
		speed: ORBIT_CONFIG.speeds.middle,
		techName: 'nextjs',
		phaseShift: 0,
		label: 'Next.js',
		Icon: Package,
		color: '#000000',
	},
	{
		id: 'nodejs',
		orbitRadius: ORBIT_CONFIG.radii.middle,
		size: ORBIT_CONFIG.sizes.middle,
		speed: ORBIT_CONFIG.speeds.middle,
		techName: 'nodejs',
		phaseShift: Math.PI / 2,
		label: 'Node.js',
		Icon: Server,
		color: '#339933',
	},
	{
		id: 'graphql',
		orbitRadius: ORBIT_CONFIG.radii.middle,
		size: ORBIT_CONFIG.sizes.middle,
		speed: ORBIT_CONFIG.speeds.middle,
		techName: 'graphql',
		phaseShift: Math.PI,
		label: 'GraphQL',
		Icon: Workflow,
		color: '#E10098',
	},
	{
		id: 'postgresql',
		orbitRadius: ORBIT_CONFIG.radii.middle,
		size: ORBIT_CONFIG.sizes.middle,
		speed: ORBIT_CONFIG.speeds.middle,
		techName: 'postgresql',
		phaseShift: (3 * Math.PI) / 2,
		label: 'PostgreSQL',
		Icon: Database,
		color: '#4169E1',
	},

	// =========================================================================
	// OUTER ORBIT - Infrastructure & DevOps
	// =========================================================================
	{
		id: 'aws',
		orbitRadius: ORBIT_CONFIG.radii.outer,
		size: ORBIT_CONFIG.sizes.outer,
		speed: ORBIT_CONFIG.speeds.outer,
		techName: 'aws',
		phaseShift: 0,
		label: 'AWS',
		Icon: Cloud,
		color: '#FF9900',
	},
	{
		id: 'docker',
		orbitRadius: ORBIT_CONFIG.radii.outer,
		size: ORBIT_CONFIG.sizes.outer,
		speed: ORBIT_CONFIG.speeds.outer,
		techName: 'docker',
		phaseShift: Math.PI / 3,
		label: 'Docker',
		Icon: Container,
		color: '#2496ED',
	},
	{
		id: 'railway',
		orbitRadius: ORBIT_CONFIG.radii.outer,
		size: ORBIT_CONFIG.sizes.outer,
		speed: ORBIT_CONFIG.speeds.outer,
		techName: 'railway',
		phaseShift: (2 * Math.PI) / 3,
		label: 'Railway',
		Icon: Train,
		color: '#0B0D0E',
	},
	{
		id: 'github',
		orbitRadius: ORBIT_CONFIG.radii.outer,
		size: ORBIT_CONFIG.sizes.outer,
		speed: ORBIT_CONFIG.speeds.outer,
		techName: 'github',
		phaseShift: Math.PI,
		label: 'GitHub Actions',
		Icon: GitBranch,
		color: '#2088FF',
	},
	{
		id: 'redis',
		orbitRadius: ORBIT_CONFIG.radii.outer,
		size: ORBIT_CONFIG.sizes.outer,
		speed: ORBIT_CONFIG.speeds.outer,
		techName: 'redis',
		phaseShift: (4 * Math.PI) / 3,
		label: 'Redis',
		Icon: Blocks,
		color: '#DC382D',
	},
	{
		id: 'mongodb',
		orbitRadius: ORBIT_CONFIG.radii.outer,
		size: ORBIT_CONFIG.sizes.outer,
		speed: ORBIT_CONFIG.speeds.outer,
		techName: 'mongodb',
		phaseShift: (5 * Math.PI) / 3,
		label: 'MongoDB',
		Icon: Database,
		color: '#47A248',
	},
]
