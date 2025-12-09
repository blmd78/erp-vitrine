import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('utils', () => {
	describe('cn', () => {
		it('should merge class names correctly', () => {
			expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
		})

		it('should handle conditional classes', () => {
			const isActive = true
			const isInactive = false

			expect(cn('base-class', isActive && 'conditional-class')).toBe(
				'base-class conditional-class',
			)
			expect(cn('base-class', isInactive && 'conditional-class')).toBe(
				'base-class',
			)
		})

		it('should handle undefined and null values', () => {
			expect(cn('base-class', undefined, null, 'other-class')).toBe(
				'base-class other-class',
			)
		})

		it('should merge conflicting Tailwind classes', () => {
			expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
		})
	})
})
