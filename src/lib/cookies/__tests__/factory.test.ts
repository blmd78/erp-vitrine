/**
 * Tests for createCookieStrategy factory
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { CookieStoreStrategy } from '../cookie-store-strategy'
import { DocumentCookieStrategy } from '../document-cookie-strategy'
import { CookieError } from '../errors'
import { createCookieStrategy } from '../factory'
import { mockCookieStoreAPI, resetCookieMocks } from './test-helpers'

describe('createCookieStrategy', () => {
	beforeEach(() => {
		resetCookieMocks()
	})

	afterEach(() => {
		resetCookieMocks()
	})

	it('should return CookieStoreStrategy when API available and secure context', () => {
		// Mock Cookie Store API available + HTTPS
		mockCookieStoreAPI()

		const strategy = createCookieStrategy()

		expect(strategy).toBeInstanceOf(CookieStoreStrategy)
	})

	it('should return DocumentCookieStrategy when API not available', () => {
		// No Cookie Store API mock = not available
		Object.defineProperty(window, 'isSecureContext', {
			value: false,
			writable: true,
			configurable: true,
		})

		const strategy = createCookieStrategy()

		expect(strategy).toBeInstanceOf(DocumentCookieStrategy)
	})

	it('should return DocumentCookieStrategy when API available but not secure context', () => {
		// Mock Cookie Store API but not secure context (HTTP)
		mockCookieStoreAPI()
		Object.defineProperty(window, 'isSecureContext', {
			value: false,
			writable: true,
			configurable: true,
		})
		Object.defineProperty(window, 'location', {
			value: { protocol: 'http:' },
			writable: true,
			configurable: true,
		})

		const strategy = createCookieStrategy()

		expect(strategy).toBeInstanceOf(DocumentCookieStrategy)
	})

	it('should throw CookieError when window is undefined', () => {
		// Save original window
		const originalWindow = global.window

		// Temporarily remove window
		Object.defineProperty(global, 'window', {
			value: undefined,
			writable: true,
			configurable: true,
		})

		expect(() => createCookieStrategy()).toThrow(CookieError)
		expect(() => createCookieStrategy()).toThrow(
			'Cannot create cookie strategy: window is undefined',
		)

		// Restore window
		Object.defineProperty(global, 'window', {
			value: originalWindow,
			writable: true,
			configurable: true,
		})
	})

	it('should use HTTPS protocol for CookieStoreStrategy', () => {
		mockCookieStoreAPI()
		Object.defineProperty(window, 'location', {
			value: { protocol: 'https:' },
			writable: true,
			configurable: true,
		})

		const strategy = createCookieStrategy()

		expect(strategy).toBeInstanceOf(CookieStoreStrategy)
	})

	it('should use HTTP protocol for DocumentCookieStrategy fallback', () => {
		// No Cookie Store API
		Object.defineProperty(window, 'isSecureContext', {
			value: false,
			writable: true,
			configurable: true,
		})
		Object.defineProperty(window, 'location', {
			value: { protocol: 'http:' },
			writable: true,
			configurable: true,
		})

		const strategy = createCookieStrategy()

		expect(strategy).toBeInstanceOf(DocumentCookieStrategy)
	})
})
