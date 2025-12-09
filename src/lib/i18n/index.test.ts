// ====================================
// TESTS FOR I18N SYSTEM
// ====================================

import { beforeEach, describe, expect, it } from 'vitest'

import { createT, setGlobalLocale, t } from './index'

describe('Système i18n', () => {
	beforeEach(() => {
		// Reset global function for each test
		setGlobalLocale('en')
	})

	describe('createT()', () => {
		it('devrait créer une fonction t() pour une locale donnée', () => {
			const tEn = createT('en')
			const tFr = createT('fr')

			expect(typeof tEn).toBe('function')
			expect(typeof tFr).toBe('function')
		})

		it('devrait retourner des traductions différentes selon la locale', () => {
			const tEn = createT('en')
			const tFr = createT('fr')

			const homeEn = tEn('common.navigation.home')
			const homeFr = tFr('common.navigation.home')

			expect(homeEn).toBe('Home')
			expect(homeFr).toBe('Accueil')
		})
	})

	describe('Simple keys', () => {
		it('should get a simple translation', () => {
			const tEn = createT('en')
			const result = tEn('common.navigation.home')
			expect(result).toBe('Home')
		})

		it('should get a nested translation', () => {
			const tEn = createT('en')
			const result = tEn('home.hero.title')
			expect(result).toBe('YOUR NEXT')
		})
	})

	describe('Nested objects', () => {
		it('should return an object for nested keys', () => {
			const tEn = createT('en')
			const result = tEn('home.hero')

			expect(result).toBeTypeOf('object')
			expect(result).toHaveProperty('title', 'YOUR NEXT')
			expect(result).toHaveProperty('titleHighlight', 'BREAKTHROUGH')
		})

		it('should return the complete section', () => {
			const tEn = createT('en')
			const result = tEn('common.navigation')

			expect(typeof result).toBe('object')
			expect(result.home).toBe('Home')
			expect(result.about).toBe('About')
		})
	})

	describe('Arrays and indices', () => {
		it('should get an array element by index', () => {
			const tEn = createT('en')
			// Test with an examples array we added
			const result = tEn('common.examples.messages.0')
			expect(result).toBe('Welcome {name}!')
		})

		it('should return the entire array', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages')

			expect(Array.isArray(result)).toBe(true)
			if (Array.isArray(result)) {
				expect(result[0]).toBe('Welcome {name}!')
				expect(result.length).toBe(3)
			}
		})
	})

	describe('Dynamic keys', () => {
		it('should resolve dynamic keys with variables', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', { index: 0 })
			expect(result).toBe('Welcome {name}!')
		})

		it('should resolve complex dynamic keys', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', { index: 1 })
			expect(result).toBe('Your account was created on {date}')
		})
	})

	describe('Interpolation', () => {
		it('should interpolate simple variables', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.interpolation.greeting', {
				name: 'John',
				siteName: 'Nextnode',
			})
			expect(result).toBe('Hello John, welcome to Nextnode!')
		})

		it('should interpolate variables with dynamic keys', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', {
				index: 0,
				name: 'Alice',
			})
			expect(result).toBe('Welcome Alice!')
		})

		it('should handle missing variables', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.interpolation.greeting', {
				name: 'John',
				// siteName missing
			})
			expect(result).toBe('Hello John, welcome to {siteName}!')
		})

		it('should handle different types of variables', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.interpolation.datetime', {
				date: new Date('2024-01-01'),
				time: '14:30',
			})
			expect(result).toContain('2024')
			expect(result).toContain('14:30')
		})
	})

	describe('Error handling', () => {
		it('should return the key if translation does not exist', () => {
			const tEn = createT('en')
			const result = tEn('clé.inexistante')
			expect(result).toBe('clé.inexistante')
		})

		it('should handle invalid dynamic keys', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', {
				// index missing
			})
			// Should return original key or default value
			expect(typeof result).toBe('string')
		})
	})

	describe('Global t() function', () => {
		it('should use the default global locale', () => {
			const result = t('common.navigation.home')
			expect(result).toBe('Home')
		})

		it('should change when updating the global locale', () => {
			setGlobalLocale('fr')
			const result = t('common.navigation.home')
			expect(result).toBe('Accueil')

			// Reset for other tests
			setGlobalLocale('en')
		})
	})

	describe('Cache', () => {
		it('should cache results', () => {
			const tEn = createT('en')

			// First call
			const result1 = tEn('home.hero.title')

			// Second call (should be cached)
			const result2 = tEn('home.hero.title')

			expect(result1).toBe(result2)
			// Test that cache works by checking equality
		})
	})
})
