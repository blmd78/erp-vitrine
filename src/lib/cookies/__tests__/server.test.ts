/**
 * Tests for createServerCookieManager (SSR)
 */

import { describe, expect, it } from 'vitest'

import { createServerCookieManager } from '../server'
import { createMockRequest } from './test-helpers'

describe('createServerCookieManager', () => {
	describe('get()', () => {
		it('should get existing cookie from header', () => {
			const request = createMockRequest(
				'sessionId=abc123; userId=user456',
			)
			const manager = createServerCookieManager(request)

			const result = manager.get('sessionId')

			expect(result).toBe('abc123')
		})

		it('should return null for non-existent cookie', () => {
			const request = createMockRequest('sessionId=abc123')
			const manager = createServerCookieManager(request)

			const result = manager.get('nonExistent')

			expect(result).toBeNull()
		})

		it('should handle URL encoded cookies', () => {
			const request = createMockRequest('encoded=hello%20world')
			const manager = createServerCookieManager(request)

			const result = manager.get('encoded')

			expect(result).toBe('hello world')
		})

		it('should handle empty cookie header', () => {
			const request = createMockRequest('')
			const manager = createServerCookieManager(request)

			const result = manager.get('testCookie')

			expect(result).toBeNull()
		})

		it('should handle multiple cookies', () => {
			const request = createMockRequest(
				'cookie1=value1; cookie2=value2; cookie3=value3',
			)
			const manager = createServerCookieManager(request)

			expect(manager.get('cookie1')).toBe('value1')
			expect(manager.get('cookie2')).toBe('value2')
			expect(manager.get('cookie3')).toBe('value3')
		})

		it('should handle cookies with special characters', () => {
			const request = createMockRequest('test%20cookie=test%20value')
			const manager = createServerCookieManager(request)

			const result = manager.get('test cookie')

			expect(result).toBe('test value')
		})
	})

	describe('getAll()', () => {
		it('should get all cookies from header', () => {
			const request = createMockRequest(
				'sessionId=abc123; userId=user456; theme=dark',
			)
			const manager = createServerCookieManager(request)

			const result = manager.getAll()

			expect(result).toEqual({
				sessionId: 'abc123',
				userId: 'user456',
				theme: 'dark',
			})
		})

		it('should return empty object for empty header', () => {
			const request = createMockRequest('')
			const manager = createServerCookieManager(request)

			const result = manager.getAll()

			expect(result).toEqual({})
		})

		it('should handle URL encoded cookies', () => {
			const request = createMockRequest(
				'test%20cookie=hello%20world; another=value',
			)
			const manager = createServerCookieManager(request)

			const result = manager.getAll()

			expect(result).toEqual({
				'test cookie': 'hello world',
				another: 'value',
			})
		})

		it('should ignore malformed cookies', () => {
			const request = createMockRequest(
				'valid=value; ; invalid; another=value2',
			)
			const manager = createServerCookieManager(request)

			const result = manager.getAll()

			expect(result).toEqual({
				valid: 'value',
				another: 'value2',
			})
		})

		it('should handle single cookie', () => {
			const request = createMockRequest('sessionId=abc123')
			const manager = createServerCookieManager(request)

			const result = manager.getAll()

			expect(result).toEqual({
				sessionId: 'abc123',
			})
		})

		it('should handle cookies with whitespace', () => {
			const request = createMockRequest(
				' cookie1=value1 ;  cookie2=value2  ',
			)
			const manager = createServerCookieManager(request)

			const result = manager.getAll()

			expect(result).toEqual({
				cookie1: 'value1',
				cookie2: 'value2',
			})
		})
	})

	describe('edge cases', () => {
		it('should handle request with no cookie header', () => {
			const request = {
				headers: {
					get: () => null,
				},
			} as unknown as Request

			const manager = createServerCookieManager(request)

			expect(manager.get('test')).toBeNull()
			expect(manager.getAll()).toEqual({})
		})

		it('should handle cookies without values', () => {
			const request = createMockRequest('empty=; valid=value')
			const manager = createServerCookieManager(request)

			const result = manager.getAll()

			// Cookies without values should be ignored
			expect(result).toEqual({
				valid: 'value',
			})
		})
	})
})
