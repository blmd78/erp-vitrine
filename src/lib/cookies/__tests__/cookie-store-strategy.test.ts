/**
 * Tests for CookieStoreStrategy (Cookie Store API)
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CookieStoreStrategy } from '../cookie-store-strategy'
import { CookieError } from '../errors'
import {
	createMockCookie,
	mockCookieStoreAPI,
	resetCookieMocks,
} from './test-helpers'

describe('CookieStoreStrategy', () => {
	let strategy: CookieStoreStrategy
	let cookieStoreMock: ReturnType<typeof mockCookieStoreAPI>

	beforeEach(() => {
		resetCookieMocks()
		cookieStoreMock = mockCookieStoreAPI()
		strategy = new CookieStoreStrategy()
	})

	afterEach(() => {
		resetCookieMocks()
	})

	describe('get()', () => {
		it('should get existing cookie', async () => {
			const mockCookie = createMockCookie('testCookie', 'testValue')
			cookieStoreMock.get.mockResolvedValue(mockCookie)

			const result = await strategy.get('testCookie')

			expect(result).toBe('testValue')
			expect(cookieStoreMock.get).toHaveBeenCalledWith('testCookie')
		})

		it('should return null for non-existent cookie', async () => {
			cookieStoreMock.get.mockResolvedValue(null)

			const result = await strategy.get('nonExistent')

			expect(result).toBeNull()
		})

		it('should throw CookieError on failure', async () => {
			const error = new Error('Cookie Store API error')
			cookieStoreMock.get.mockRejectedValue(error)

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
			cookieStoreMock.set.mockResolvedValue(undefined)

			const result = await strategy.set('testCookie', 'testValue', {})

			expect(result).toBe(true)
			expect(cookieStoreMock.set).toHaveBeenCalledWith({
				name: 'testCookie',
				value: 'testValue',
				path: '/',
				sameSite: 'lax',
			})
		})

		it('should set cookie with all options', async () => {
			cookieStoreMock.set.mockResolvedValue(undefined)
			const expires = new Date('2025-12-31')

			const result = await strategy.set('testCookie', 'testValue', {
				path: '/custom',
				domain: 'example.com',
				expires,
				sameSite: 'strict',
			})

			expect(result).toBe(true)
			expect(cookieStoreMock.set).toHaveBeenCalledWith({
				name: 'testCookie',
				value: 'testValue',
				path: '/custom',
				domain: 'example.com',
				expires: expires.getTime(),
				sameSite: 'strict',
			})
		})

		it('should convert maxAge to expires timestamp', async () => {
			cookieStoreMock.set.mockResolvedValue(undefined)
			const now = Date.now()
			vi.spyOn(Date, 'now').mockReturnValue(now)

			const maxAge = 3600 // 1 hour in seconds

			await strategy.set('testCookie', 'testValue', { maxAge })

			expect(cookieStoreMock.set).toHaveBeenCalledWith(
				expect.objectContaining({
					expires: now + maxAge * 1000,
				}),
			)
		})

		it('should throw CookieError on failure', async () => {
			const error = new Error('Cookie Store API error')
			cookieStoreMock.set.mockRejectedValue(error)

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
			cookieStoreMock.delete.mockResolvedValue(undefined)

			const result = await strategy.delete('testCookie', {})

			expect(result).toBe(true)
			expect(cookieStoreMock.delete).toHaveBeenCalledWith({
				name: 'testCookie',
				path: '/',
				domain: undefined,
			})
		})

		it('should delete cookie with path and domain', async () => {
			cookieStoreMock.delete.mockResolvedValue(undefined)

			const result = await strategy.delete('testCookie', {
				path: '/custom',
				domain: 'example.com',
			})

			expect(result).toBe(true)
			expect(cookieStoreMock.delete).toHaveBeenCalledWith({
				name: 'testCookie',
				path: '/custom',
				domain: 'example.com',
			})
		})

		it('should throw CookieError on failure', async () => {
			const error = new Error('Cookie Store API error')
			cookieStoreMock.delete.mockRejectedValue(error)

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
			const mockCookies = [
				createMockCookie('cookie1', 'value1'),
				createMockCookie('cookie2', 'value2'),
				createMockCookie('cookie3', 'value3'),
			]
			cookieStoreMock.getAll.mockResolvedValue(mockCookies)

			const result = await strategy.getAll()

			expect(result).toEqual({
				cookie1: 'value1',
				cookie2: 'value2',
				cookie3: 'value3',
			})
		})

		it('should return empty object when no cookies', async () => {
			cookieStoreMock.getAll.mockResolvedValue([])

			const result = await strategy.getAll()

			expect(result).toEqual({})
		})

		it('should filter cookies without name or value', async () => {
			const mockCookies = [
				createMockCookie('cookie1', 'value1'),
				{ ...createMockCookie('cookie2', 'value2'), name: '' },
				{ ...createMockCookie('cookie3', 'value3'), value: '' },
				createMockCookie('cookie4', 'value4'),
			]
			cookieStoreMock.getAll.mockResolvedValue(mockCookies)

			const result = await strategy.getAll()

			expect(result).toEqual({
				cookie1: 'value1',
				cookie4: 'value4',
			})
		})

		it('should throw CookieError on failure', async () => {
			const error = new Error('Cookie Store API error')
			cookieStoreMock.getAll.mockRejectedValue(error)

			await expect(strategy.getAll()).rejects.toThrow(CookieError)
			await expect(strategy.getAll()).rejects.toThrow(
				'Failed to get all cookies',
			)
		})
	})
})
