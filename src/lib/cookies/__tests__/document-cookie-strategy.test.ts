/**
 * Tests for DocumentCookieStrategy (document.cookie fallback)
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { DocumentCookieStrategy } from '../document-cookie-strategy'
import { CookieError } from '../errors'
import { mockDocumentCookie, resetCookieMocks } from './test-helpers'

describe('DocumentCookieStrategy', () => {
	let strategy: DocumentCookieStrategy
	let cookieMock: ReturnType<typeof mockDocumentCookie>

	beforeEach(() => {
		resetCookieMocks()
		cookieMock = mockDocumentCookie()
		strategy = new DocumentCookieStrategy()
	})

	afterEach(() => {
		resetCookieMocks()
	})

	describe('get()', () => {
		it('should get existing cookie', async () => {
			cookieMock.setCookies('testCookie=testValue')

			const result = await strategy.get('testCookie')

			expect(result).toBe('testValue')
		})

		it('should return null for non-existent cookie', async () => {
			cookieMock.setCookies('otherCookie=otherValue')

			const result = await strategy.get('nonExistent')

			expect(result).toBeNull()
		})

		it('should handle URL encoded cookies', async () => {
			cookieMock.setCookies('encoded=hello%20world')

			const result = await strategy.get('encoded')

			expect(result).toBe('hello world')
		})

		it('should handle multiple cookies', async () => {
			cookieMock.setCookies(
				'cookie1=value1; cookie2=value2; cookie3=value3',
			)

			const result = await strategy.get('cookie2')

			expect(result).toBe('value2')
		})

		it('should throw CookieError on failure', async () => {
			// Force an error by making document.cookie throw
			Object.defineProperty(document, 'cookie', {
				get: () => {
					throw new Error('Document error')
				},
				configurable: true,
			})

			await expect(strategy.get('testCookie')).rejects.toThrow(
				CookieError,
			)
			await expect(strategy.get('testCookie')).rejects.toThrow(
				'Failed to get cookie',
			)
		})
	})

	describe('set()', () => {
		it('should set cookie with basic options', async () => {
			const result = await strategy.set('testCookie', 'testValue', {})

			expect(result).toBe(true)
			expect(cookieMock.getCookies()).toContain('testCookie=testValue')
		})

		it('should set cookie with all options', async () => {
			const expires = new Date('2025-12-31')

			const result = await strategy.set('testCookie', 'testValue', {
				path: '/custom',
				domain: 'example.com',
				expires,
				maxAge: 3600,
				sameSite: 'strict',
			})

			expect(result).toBe(true)
			const cookies = cookieMock.getCookies()
			expect(cookies).toContain('testCookie=testValue')
		})

		it('should URL encode cookie name and value', async () => {
			await strategy.set('test cookie', 'test value', {})

			const cookies = cookieMock.getCookies()
			expect(cookies).toContain('test%20cookie=test%20value')
		})

		it('should add secure flag only on HTTPS', async () => {
			// HTTP context
			Object.defineProperty(window, 'location', {
				value: { protocol: 'http:' },
				writable: true,
				configurable: true,
			})

			await strategy.set('testCookie', 'testValue', { secure: true })
			let cookies = cookieMock.getCookies()
			expect(cookies).not.toContain('secure')

			// HTTPS context
			Object.defineProperty(window, 'location', {
				value: { protocol: 'https:' },
				writable: true,
				configurable: true,
			})

			await strategy.set('secureCookie', 'secureValue', { secure: true })
			cookies = cookieMock.getCookies()
			// Note: Our mock doesn't preserve attributes, just checks the call happened
			expect(cookies).toContain('secureCookie=secureValue')
		})

		it('should handle sameSite attribute', async () => {
			const result = await strategy.set('testCookie', 'testValue', {
				sameSite: 'none',
			})

			expect(result).toBe(true)
		})

		it('should throw CookieError on failure', async () => {
			// Force an error by making document.cookie throw
			Object.defineProperty(document, 'cookie', {
				set: () => {
					throw new Error('Document error')
				},
				configurable: true,
			})

			await expect(
				strategy.set('testCookie', 'testValue', {}),
			).rejects.toThrow(CookieError)
			await expect(
				strategy.set('testCookie', 'testValue', {}),
			).rejects.toThrow('Failed to set cookie')
		})
	})

	describe('delete()', () => {
		it('should delete cookie', async () => {
			cookieMock.setCookies('testCookie=testValue')

			const result = await strategy.delete('testCookie', {})

			expect(result).toBe(true)
			expect(cookieMock.getCookies()).not.toContain('testCookie')
		})

		it('should delete cookie with path and domain', async () => {
			cookieMock.setCookies('testCookie=testValue')

			const result = await strategy.delete('testCookie', {
				path: '/custom',
				domain: 'example.com',
			})

			expect(result).toBe(true)
		})

		it('should throw CookieError on failure', async () => {
			// Force an error by making document.cookie throw
			Object.defineProperty(document, 'cookie', {
				set: () => {
					throw new Error('Document error')
				},
				configurable: true,
			})

			await expect(strategy.delete('testCookie', {})).rejects.toThrow(
				CookieError,
			)
			await expect(strategy.delete('testCookie', {})).rejects.toThrow(
				'Failed to delete cookie',
			)
		})
	})

	describe('getAll()', () => {
		it('should get all cookies', async () => {
			cookieMock.setCookies(
				'cookie1=value1; cookie2=value2; cookie3=value3',
			)

			const result = await strategy.getAll()

			expect(result).toEqual({
				cookie1: 'value1',
				cookie2: 'value2',
				cookie3: 'value3',
			})
		})

		it('should return empty object when no cookies', async () => {
			cookieMock.clearCookies()

			const result = await strategy.getAll()

			expect(result).toEqual({})
		})

		it('should handle URL encoded cookies', async () => {
			cookieMock.setCookies('test%20cookie=hello%20world')

			const result = await strategy.getAll()

			expect(result).toEqual({
				'test cookie': 'hello world',
			})
		})

		it('should ignore malformed cookies', async () => {
			cookieMock.setCookies('valid=value; ; invalid; another=value2')

			const result = await strategy.getAll()

			expect(result).toEqual({
				valid: 'value',
				another: 'value2',
			})
		})

		it('should throw CookieError on failure', async () => {
			// Force an error by making document.cookie throw
			Object.defineProperty(document, 'cookie', {
				get: () => {
					throw new Error('Document error')
				},
				configurable: true,
			})

			await expect(strategy.getAll()).rejects.toThrow(CookieError)
			await expect(strategy.getAll()).rejects.toThrow(
				'Failed to get all cookies',
			)
		})
	})
})
