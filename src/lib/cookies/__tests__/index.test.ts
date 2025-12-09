/**
 * Integration tests for public cookie API (index.ts)
 * Tests the actual delegation to strategies without complex mocking
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { getAllCookies, getCookie, removeCookie, setCookie } from '../index'
import { mockDocumentCookie, resetCookieMocks } from './test-helpers'

describe('Cookie Public API - Integration Tests', () => {
	let cookieMock: ReturnType<typeof mockDocumentCookie>

	beforeEach(() => {
		resetCookieMocks()
		cookieMock = mockDocumentCookie()
	})

	afterEach(() => {
		resetCookieMocks()
	})

	describe('setCookie()', () => {
		it('should set cookie successfully', async () => {
			const result = await setCookie('testCookie', 'testValue', {})

			expect(result).toBe(true)
			expect(cookieMock.getCookies()).toContain('testCookie=testValue')
		})

		it('should set cookie with options', async () => {
			const result = await setCookie('testCookie', 'testValue', {
				path: '/custom',
				maxAge: 3600,
			})

			expect(result).toBe(true)
		})

		it('should return false when window is undefined', async () => {
			const originalWindow = global.window

			Object.defineProperty(global, 'window', {
				value: undefined,
				writable: true,
				configurable: true,
			})

			const result = await setCookie('testCookie', 'testValue', {})

			expect(result).toBe(false)

			Object.defineProperty(global, 'window', {
				value: originalWindow,
				writable: true,
				configurable: true,
			})
		})
	})

	describe('getCookie()', () => {
		it('should get existing cookie', async () => {
			cookieMock.setCookies('testCookie=testValue')

			const result = await getCookie('testCookie')

			expect(result).toBe('testValue')
		})

		it('should return null for non-existent cookie', async () => {
			const result = await getCookie('nonExistent')

			expect(result).toBeNull()
		})

		it('should return null when window is undefined', async () => {
			const originalWindow = global.window

			Object.defineProperty(global, 'window', {
				value: undefined,
				writable: true,
				configurable: true,
			})

			const result = await getCookie('testCookie')

			expect(result).toBeNull()

			Object.defineProperty(global, 'window', {
				value: originalWindow,
				writable: true,
				configurable: true,
			})
		})
	})

	describe('removeCookie()', () => {
		it('should remove existing cookie', async () => {
			cookieMock.setCookies('testCookie=testValue')

			const result = await removeCookie('testCookie', {})

			expect(result).toBe(true)
			expect(cookieMock.getCookies()).not.toContain('testCookie')
		})

		it('should return false when window is undefined', async () => {
			const originalWindow = global.window

			Object.defineProperty(global, 'window', {
				value: undefined,
				writable: true,
				configurable: true,
			})

			const result = await removeCookie('testCookie', {})

			expect(result).toBe(false)

			Object.defineProperty(global, 'window', {
				value: originalWindow,
				writable: true,
				configurable: true,
			})
		})
	})

	describe('getAllCookies()', () => {
		it('should get all cookies', async () => {
			cookieMock.setCookies('cookie1=value1; cookie2=value2')

			const result = await getAllCookies()

			expect(result).toEqual({
				cookie1: 'value1',
				cookie2: 'value2',
			})
		})

		it('should return empty object when no cookies', async () => {
			const result = await getAllCookies()

			expect(result).toEqual({})
		})

		it('should return empty object when window is undefined', async () => {
			const originalWindow = global.window

			Object.defineProperty(global, 'window', {
				value: undefined,
				writable: true,
				configurable: true,
			})

			const result = await getAllCookies()

			expect(result).toEqual({})

			Object.defineProperty(global, 'window', {
				value: originalWindow,
				writable: true,
				configurable: true,
			})
		})
	})
})
